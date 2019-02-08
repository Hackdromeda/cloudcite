import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CiteForm from '../CiteForm/CiteForm.js';
import './WebsiteAutofill.css';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

class WebsiteAutofill extends Component {

    state = {
        websiteInputURL: "",
        startCiting: false,
        citationData: null,
        fieldMap: null,
        creatorsMap: null
    }

    async componentDidMount() {
        const fieldMap = await fetch(`https://cdn.cloudcite.net/fields/webpage.json`)
                          .then((response) => {
                            return response.json();
                          });
        const creatorsMap = await fetch(`https://cdn.cloudcite.net/creators/webpage.json`)
                          .then((response) => {
                            return response.json();
                          });
        this.setState({
            fieldMap: fieldMap,
            creatorsMap: creatorsMap
        });
    }

    formatURL(url) {
        let newURL: string = ""
        switch (url.substring(0, 7)) {
            case 'https:/':
                newURL = url.substring(8, url.length)
                break;
            case 'http://':
                newURL =  url.substring(7, url.length)
                break;
            default:
                newURL = url
        }
        if (newURL.substring(0, 4) === "www.") {
            newURL = newURL.substring(4, newURL.length)
        }
        return newURL
    }

    async citeURL(url) {
        let citationData = await fetch('https://api.cloudcite.net/autofill', {
            method: 'POST',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            body: JSON.stringify({
                "format": "website",
                "URL": (url.substring(0, 4) === 'http') ? url: (`http://${url}`)
            })
        }).then((response) => response.json());

        citationData.URL = this.formatURL(citationData.URL);
        citationData.contributors = [];
        if (citationData.author && citationData.author.length > 0) {
            //@ts-ignore
            citationData.author.forEach(author => {
                //@ts-ignore
                citationData.contributors.push({given: author.given ? author.given.split(" ")[0]: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
            });
        }
        if (citationData.contributors.length == 0) {
            citationData.contributors.push({given: "", middle: "", family: "", type: "Author"})
        }
        this.setState({citationData: citationData});
    }

    buildForm() {
        if (this.state.citationData && this.state.fieldMap && this.state.creatorsMap) {
            return (
                <CiteForm citationData={this.state.citationData} fieldMap={this.state.fieldMap} creatorsMap={this.state.creatorsMap}/>
            );
        }
        else {
            return (
                <Form>
                    <Input onChange={(e) => this.setState({websiteInputURL: e.target.value})} placeholder="Cite Website"/>
                    <Button onClick={() => this.citeURL(this.state.websiteInputURL)} type="submit">Cite Website</Button>
                </Form>
            );
        }
    }

    render() {
        return (
            <div>
                {this.buildForm()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WebsiteAutofill));