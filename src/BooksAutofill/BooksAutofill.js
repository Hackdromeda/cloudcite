import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CiteForm from '../CiteForm/CiteForm.js';
import { createCitation } from '../functions/createCitation.js';
// import './BookAutofill.scss';
import Loader from 'react-loaders';
import crypto from 'crypto';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

class WebsiteAutofill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookOptions: [],
            selectedBook: null,
            bookIdentificationSelected: 'Title',
            bookInputURL: "",
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
            loaderVisible: false
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

    async citeBook(book) {
        if (url !== '') {
            this.setState({ loaderVisible: true });
            try {
                let citationData = await fetch('https://api.cloudcite.net/autofillv2', {
                    method: 'POST',
                    headers: {
                        'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                    },
                    body: JSON.stringify({
                        "format": "website",
                        "id": crypto.randomBytes(10).toString('hex'),
                        "URL": (url.substring(0, 4) === 'http') ? url : (`http://${url}`),
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
        if (this.state.citationData && this.state.fieldMap && this.state.creatorsMap) {
            return (
                <div>
                    <CiteForm citationData={this.state.citationData} fieldMap={this.state.fieldMap} creatorsMap={this.state.creatorsMap} />
                </div>
            );
        }
        else {
            return (
                <Form className="citeForm">
                    <Input onChange={(e) => this.setState({ bookInputURL: e.target.value })} placeholder="Cite Book" disabled={this.state.loaderVisible} />
                    <Button className="btn" loading={this.state.loaderVisible} onClick={() => this.citeBook(this.state.bookInput)} type="submit" disabled={this.state.websiteInputURL === '' || this.state.loaderVisible}>Cite Book</Button>
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

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WebsiteAutofill));