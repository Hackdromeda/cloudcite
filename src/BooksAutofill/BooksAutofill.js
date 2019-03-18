import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CiteForm from '../CiteForm/CiteForm.js';
import { createCitation } from '../functions/createCitation.js';
import './BooksAutofill.scss';
import Loader from 'react-loaders';
import debounce from 'lodash.debounce';
import shortid from 'shortid';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

class BooksAutofill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookOptions: [],
            selectedBook: null,
            bookIdentificationSelected: 'Title',
            bookIdentification: [
                {
                    "key": "Title",
                    "text": "Title",
                    "value": "Title"
                },
                {
                    "key": "ISBN",
                    "text": "ISBN",
                    "value": "ISBN"
                },
                {
                    "key": "OCLC",
                    "text": "OCLC",
                    "value": "OCLC"
                },
                {
                    "key": "LCCN",
                    "text": "LCCN",
                    "value": "LCCN"
                }
            ],
            startCiting: false,
            citationData: null,
            fieldMap: null,
            creatorsMap: null,
            loaderVisible: false,
            startIndex: 0,
            inputValue: ''
        };
    }

    componentDidMount() {
        this.fetchFieldAndCreatorsMaps();
    }

    async fetchFieldAndCreatorsMaps() {
        const fieldMap = await fetch(`https://cdn.cloudcite.net/fields/book.json`)
            .then((response) => {
                return response.json();
            });
        const creatorsMap = await fetch(`https://cdn.cloudcite.net/creators/book.json`)
            .then((response) => {
                return response.json();
            });
        this.setState({
            fieldMap: fieldMap,
            creatorsMap: creatorsMap
        });
    }

    getBookOptions = debounce(async bookInputValue => {
        this.setState({ 'inputValue': bookInputValue.value, 'loaderVisible': true, 'startIndex': 0 });
        if (this.state.bookOptions.length > 0) {
            this.setState({ "bookOptions": [] });
        }
        if (this.state.bookIdentificationSelected && this.state.bookIdentificationSelected.trim() !== "") {
            try {
                let bookOptions = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=20&startIndex=${this.state.startIndex}&q=${bookInputValue.value}+${this.state.bookIdentificationSelected}`, {
                    method: 'GET'
                })
                    .then((response) => {
                        return response.json();
                    });
                this.setState({ "bookOptions": bookOptions.items, 'loaderVisible': false });
            }
            catch (err) {
                if (process.env.NODE_ENV === 'production') {
                    window.ga('send', 'exception', {
                        'exDescription': err.message,
                        'exFatal': false
                    });
                }
                else {
                    console.log(err);
                }
            }
        }
    }, 1000);

    moreBooks = async () => {
        this.setState({ 'startIndex': this.state.startIndex + 20 });
        try {
            let bookOptions = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=20&startIndex=${this.state.startIndex}&q=${this.state.inputValue}+${this.state.bookIdentificationSelected}`, {
                method: 'GET'
            }).then((response) => {
                return response.json();
            });
            this.setState({ "bookOptions": this.state.bookOptions.concat(bookOptions.items) });
        }
        catch (err) {
            if (process.env.NODE_ENV === 'production') {
                window.ga('send', 'exception', {
                    'exDescription': err.message,
                    'exFatal': false
                });
            }
            else {
                console.log(err);
            }
        }
    }

    async citeBook(book) {
        try {
            this.setState({ loaderVisible: true });
            let citation = {
                "issued": {
                    "month": null,
                    "year": null,
                    "day": null
                },
                "id": shortid.generate(),
                "author": [],
                "editor": [],
                "collection-editor": [],
                "translator": [],
                "edition": null,
                "language": book.volumeInfo.language ? await this.convertLang(book.volumeInfo.language) : null,
                "title": book.volumeInfo.title ? book.volumeInfo.title : null,
                "title-short": null,
                "publisher": book.volumeInfo.publisher ? book.volumeInfo.publisher : null,
                "publisher-place": null,
                "ISBN": null,
                "number-of-pages": book.volumeInfo.pageCount ? book.volumeInfo.pageCount : null,
                "number-of-volumes": null,
                "source": null,
                "URL": null,
                "dimensions": null,
                "abstract": book.volumeInfo.description ? book.volumeInfo.description : null,
                "collection-title": null,
                "container-title": null,
                "collection-number": null,
                "type": "book"
            };
            citation.contributors = [];
            for (let author of book.volumeInfo.authors) {
                let fullName = author.split(' ');
                let firstName = fullName[0];
                let middleName = '';
                let lastName = '';
                if (fullName.length >= 2) {
                    lastName = fullName[fullName.length - 1];
                }
                if (fullName.length === 3) {
                    middleName = fullName[fullName.length - 2];
                }
                if (fullName.length > 3) {
                    for (var j = 1; j > fullName.length - 2; j++) {
                        firstName = firstName + " " + fullName[j];
                    }
                    middleName = fullName[fullName.length - 2];
                }
                citation.contributors.push({ given: `${firstName} ${middleName}`, family: lastName, type: 'author', id: shortid.generate() });
            }
            if (book.volumeInfo.publishedDate && book.volumeInfo.publishedDate !== "") {
                let date = book.volumeInfo.publishedDate.split("-");
                if (date.length >= 1) {
                    citation.issued.year = date[0];
                }
                if (date.length >= 2) {
                    citation.issued.month = date[1];
                }
                if (date.length >= 3) {
                    citation.issued.day = date[2];
                }
            }
            if (book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers !== "") {
                let ISBNs = [];
                for (let i = 0; i < book.volumeInfo.industryIdentifiers.length; i++) {
                    if (book.volumeInfo.industryIdentifiers[i].type.includes("ISBN")) {
                        ISBNs.push(book.volumeInfo.industryIdentifiers[i].identifier)
                    }
                }
                if (ISBNs.length >= 1) {
                    citation.ISBN = ISBNs[ISBNs.length - 1];
                }
            }
            if (book.volumeInfo.dimensions && book.volumeInfo.dimensions !== "") {
                let dimensions;
                if (book.volumeInfo.dimensions.height && book.volumeInfo.dimensions.height !== "") {
                    dimensions = book.volumeInfo.dimensions.height;
                }
                if (book.volumeInfo.dimensions.width && book.volumeInfo.dimensions.width !== "") {
                    dimensions = dimensions + " x " + book.volumeInfo.dimensions.width;
                }
                if (book.volumeInfo.dimensions.thickness && book.volumeInfo.dimensions.thickness !== "") {
                    dimensions = dimensions + " x " + book.volumeInfo.dimensions.thickness;
                }
                citation.dimensions = dimensions;
            }
            this.setState({ bookOptions: [], citationData: createCitation(citation), loaderVisible: false });
        }
        catch (err) {
            this.setState({ citationData: createCitation({ "type": "book" }), loaderVisible: false });
            if (process.env.NODE_ENV === 'production') {
                window.ga('send', 'exception', {
                    'exDescription': err.message,
                    'exFatal': false
                });
            }
            else {
                console.log(err);
            }
        }
    }

    buildForm() {
        if (this.state.citationData && this.state.fieldMap && this.state.fieldMap.length > 0 && this.state.creatorsMap) {
            return (
                <div>
                    <CiteForm citationData={this.state.citationData} fieldMap={this.state.fieldMap} creatorsMap={this.state.creatorsMap} />
                </div>
            );
        }
        else {
            return (
                <Form className="citeForm">
                    <Input
                        action={<Dropdown button basic floating lazyLoad placeholder="Type" defaultValue="Title" options={this.state.bookIdentification} onChange={(e, bookIndentificationValue) => this.setState({ "bookIdentificationSelected": bookIndentificationValue.value })} />}
                        icon='search'
                        iconPosition='left'
                        placeholder='Search...'
                        onChange={(e, value) => this.getBookOptions(value)}
                    />
                </Form>
            );
        }
    }

    async convertLang(lang) {
        lang = lang.toLowerCase();
        if (lang.length === 2) {
            const isoLangs = await import('./isoLangs.json');
            if (isoLangs[lang] != null) {
                return isoLangs[lang].name;
            } else {
                return lang;
            }
        } else if (lang.length > 2) {
            const localeLangs = await import('./localeLangs.json');
            if (localeLangs[lang] != null) {
                return localeLangs[lang][1];
            } else {
                return lang;
            }
        } else {
            return lang;
        }
    }

    render() {
        return (
            <div>
                <div className="top">
                    <h1>Cite a Book</h1>
                    <label>You can start citing a book by searching by book title or ISBN and selecting a book.</label>
                </div>
                {this.buildForm()}
                <Loader type="pacman" active={this.state.loaderVisible} color="#005eea" />
                <div id="bookList">
                    {
                        this.state.bookOptions.map((book, index) =>
                            <div className="book-card" key={index}>
                                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? <img className="book-cover" src={book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')} size="small" /> : <div />}
                                <div className="book-info">
                                    <label className="book-title">{book.volumeInfo.title}</label>
                                    <label className="book-authors">{book.volumeInfo.authors}</label>
                                    {book.volumeInfo.publishedDate ? <label className="book-pd">{book.volumeInfo.publishedDate}</label> : <div />}
                                    <button className="cite-book-btn" onClick={() => this.citeBook(book)}>Cite</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <br />
                {(this.state.bookOptions.length > 0) ? <button className="loadMore" onClick={this.moreBooks}>More</button> : ''}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BooksAutofill));