import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input, Card, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CiteForm from '../CiteForm/CiteForm.js';
import { createCitation } from '../functions/createCitation.js';
// import './BooksAutofill.scss';
import Loader from 'react-loaders';
import crypto from 'crypto';
import debounce from 'lodash.debounce';

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
            startIndex: 0
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
        if (this.state.bookOptions.length > 0) {
            this.setState({"bookOptions": []});
        }
        if (this.state.bookIdentificationSelected && this.state.bookIdentificationSelected.trim() !== "") {
            try {
                let bookOptions = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=20&startIndex=${this.state.startIndex}&q=${bookInputValue.value}+${this.state.bookIdentificationSelected}`, {
                    method: 'GET'
                })
                .then((response) => {
                    return response.json();
                });
                this.setState({"bookOptions": bookOptions.items});
            }
            catch (error) {
                console.log(error);
            }
        }
    }, 1000);

    async citeBook(book) {
        if (book !== '') {
            this.setState({ loaderVisible: true });
            try {
                let citationData = await fetch('https://api.cloudcite.net/autofill', {
                    method: 'POST',
                    headers: {
                        'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                    },
                    body: JSON.stringify({
                        "format": "book",
                        "id": crypto.randomBytes(10).toString('hex'),
                    })
                }).then((response) => response.json());
                this.setState({ citationData: citationData, loaderVisible: false });
            }
            catch (error) {
                this.setState({ citationData: createCitation({"type": "book"}), loaderVisible: false });
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
                        action={<Dropdown button basic floating lazyLoad placeholder="Type" defaultValue="Title" options={this.state.bookIdentification} onChange={(e, bookIndentificationValue) => this.setState({"bookIdentificationSelected": bookIndentificationValue.value})}/>}
                        icon='search'
                        iconPosition='left'
                        placeholder='Search...'
                        onChange={(e, value) => this.getBookOptions(value)}
                      />
                </Form>
            );
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
                <Loader type="pacman" active={this.state.loaderVisible} />
                {
                    this.state.bookOptions.map((book, index) =>
                        <Card key={index}>
                            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? <Image src={book.volumeInfo.imageLinks.thumbnail} />: <div/>}
                            <Card.Content>
                            <Card.Header>
                                {book.volumeInfo.title}
                            </Card.Header>
                                {book.volumeInfo.publishedDate ? <Card.Meta>{book.volumeInfo.publishedDate}</Card.Meta>: <div/>}
                            </Card.Content>
                            <Card.Content extra>
                                {book.volumeInfo.authors}
                            </Card.Content>
                        </Card>
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BooksAutofill));