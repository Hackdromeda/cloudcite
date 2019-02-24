import React from 'react';
// import './Preview.scss';

function Preview(props) {
    return (
        <div id="preview" style={{marginTop: '10px'}}>
            {
                props.format && props.citationHTML.length > 0 ?
                    <div className="csl-bib-body" style={{lineHeight: props.format.linespacing, marginLeft: `${props.format.hangingindent}em`, textIndent: `-${props.format.hangingindent}em`}}>
                        {props.citationHTML.map((cslEntry, index) =>
                            <div key={index} id={`cslEntryContainer${index}`} style={{clear: 'left', marginBottom: props.format.entryspacing}}>
                                <div dangerouslySetInnerHTML={{__html: cslEntry}}/>
                            </div>
                        )}
                    </div>: 
                <div/>
            }
        </div>
    )
}

export default Preview;