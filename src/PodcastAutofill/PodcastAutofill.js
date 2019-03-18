import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CiteForm from '../CiteForm/CiteForm.js';
import { createCitation } from '../functions/createCitation.js';
import './PodcastAutofill.scss';
import Loader from 'react-loaders';
import debounce from 'lodash.debounce';
import shortid from 'shortid';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

class PodcastAutofill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            podcastOptions: [],
            selectedPodcast: null,
            podcastIdentificationSelected: 'podcast',
            podcastIdentification: [
                {
                    "key": "podcast",
                    "text": "Podcast",
                    "value": "podcast"
                },
                {
                    "key": "episode",
                    "text": "Postcast Episode",
                    "value": "episode"
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
        const fieldMap = await fetch(`https://cdn.cloudcite.net/fields/song(podcast).json`)
            .then((response) => {
                return response.json();
            });
        const creatorsMap = await fetch(`https://cdn.cloudcite.net/creators/song(podcast).json`)
            .then((response) => {
                return response.json();
            });
        this.setState({
            fieldMap: fieldMap,
            creatorsMap: creatorsMap
        });
    }

    getPodcastOptions = debounce(async podcastInputValue => {
        this.setState({ 'inputValue': podcastInputValue.value, 'loaderVisible': true, 'startIndex': 0 });
        if (this.state.podcastOptions.length > 0) {
            this.setState({ "podcastOptions": [] });
        }
        if (this.state.podcastIdentificationSelected && this.state.podcastIdentificationSelected.trim() !== "") {
            try {
                let podcastOptions = await fetch('https://api.cloudcite.net/autofillv2', {
                    method: 'POST',
                    body: JSON.stringify({
                        "title": this.state.inputValue,
                        "format": "podcast",
                        "type": this.state.podcastIdentificationSelected
                    })
                })
                .then((response) => {
                    return response.json();
                });
                this.setState({ "podcastOptions": podcastOptions.results, 'loaderVisible': false });
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

    async citePodcast(podcast) {
        console.log(podcast)
        try {
            this.setState({ loaderVisible: true });
            let citationData = await fetch('https://api.cloudcite.net/autofillv2', {
                    method: 'POST',
                    headers: {
                        'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                    },
                    body: JSON.stringify({
                        "title": podcast.trackName,
                        "id": shortid.generate(),
                        "format": "podcast",
                        "type": this.state.podcastIdentificationSelected,
                        "podcast": podcast.trackId,
                        "transform": true
                    })
                }).then((response) => {
                    return response.json();
                });
            this.setState({ podcastOptions: [], citationData: createCitation(citationData), loaderVisible: false });
        }
        catch (err) {
            this.setState({ citationData: createCitation({ "type": "song(podcast)" }), loaderVisible: false });
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
                        action={<Dropdown button basic floating lazyLoad placeholder="Type" defaultValue="podcast" options={this.state.podcastIdentification} onChange={(e, { value }) => this.setState({ "podcastIdentificationSelected": value })} />}
                        icon='search'
                        iconPosition='left'
                        placeholder='Search...'
                        onChange={(e, value) => this.getPodcastOptions(value)}
                    />
                </Form>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="top">
                    <h1>Cite a Podcast</h1>
                    <label>You can start citing a podcast by searching for a podcast title or episode.</label>
                </div>
                {this.buildForm()}
                <Loader type="pacman" active={this.state.loaderVisible} color="#005eea" />
                <div id="podcastList">
                    {
                        this.state.podcastOptions.map((podcast, index) =>
                            <div className="podcast-card" key={index}>
                                {podcast.artworkUrl100 ? <img className="podcast-cover" src={podcast.artworkUrl100.replace('http://', 'https://')} size="small" /> : <div />}
                                <div className="podcast-info">
                                    <label className="podcast-title">{podcast.trackName}</label>
                                    <label className="podcast-authors">{podcast.artistName}</label>
                                    {podcast.releaseDate ? <label className="podcast-pd">{podcast.releaseDate}</label> : <div />}
                                    <button className="cite-podcast-btn" onClick={() => this.citePodcast(podcast)}>Cite</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <br />
                {(this.state.podcastOptions.length > 0) ? <button className="loadMore" onClick={this.morePodcasts}>More</button> : ''}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PodcastAutofill));