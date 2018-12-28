import { simplifyObject } from './simplifyObject';

export async function generateHTML(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let requestData = simplifyObject({style: data.style, locale: data.locale, csl: data.csl, lang: data.lang});
            if (requestData && requestData.style && requestData.locale && requestData.csl && (Object.keys(requestData.csl).length > 0)) {
                const response = await fetch("https://api.cloudcite.net/cite", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "X-Api-Key": "9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy"
                    },
                    body: JSON.stringify(requestData),
                }).then(response => {
                    return response.json();
                });
                if (response[0] && response[1].length > 0) {
                    const format = response[0];
                    let html = [];
                    let richTextHTML = "";
                    for (let i=0; i < response[1].length; i++) {
                        let generatedHTML = response[1][i];
                        let cslIndentIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML[i].indexOf('class="csl-indent"'): -1;
                        if (cslIndentIndex != -1) {
                            generatedHTML = generatedHTML = ` ${response[1][i].substring(0, cslIndentIndex - 1)} style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ${response[1][i].substring(cslIndentIndex, response[1].length)} `;
                        }
                        let cslRightInlineIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-right-inline"'): -1;
                        if (cslRightInlineIndex != -1) {
                            generatedHTML = `${generatedHTML.substring(0, cslRightInlineIndex - 1)} style="margin: 0 .4em 0 ${format.secondFieldAlign ? format.maxOffset + format.rightPadding : '0'}em;" ${generatedHTML.substring(cslRightInlineIndex, generatedHTML.length)}`;
                        }
                        let cslLeftMarginIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-left-margin"'): -1;
                        if (cslLeftMarginIndex != -1) {
                            generatedHTML = `${generatedHTML.substring(0, cslLeftMarginIndex - 1)} style="float: left; padding-right:${format.rightpadding}em; ${format.secondFieldAlign ? `text-align: right; width:${format.maxoffset}em;`: ''}" ${generatedHTML.substring(cslLeftMarginIndex, generatedHTML.length)}`;
                        }
                        html.push({id: format.entry_ids[i][0], html: generatedHTML});
                        if (format && response[1].length > 0) {
                        richTextHTML = `<div class="csl-bib-body" style="${format && format.linespacing ? (`line-height: ${format.linespacing}; `): ''} ${format && format.hangingindent ? (` text-indent: -${format.hangingindent}em;`): ''}`;
                        for (let i=0; i < response[1].length; i++) {
                            richTextHTML += `<div style="clear: left;${format && format.entryspacing ? (`margin-bottom:${format.entryspacing}em;`): ''}"> ${data.cslHTML[i] ? data.cslHTML[i]: ''}</div>`;
                        }
                        richTextHTML += '</div>';
                        }
                    }
                    resolve({format: format, html: html, richTextHTML: richTextHTML});
                }
                else {
                    reject({error: "HTML can not be generated"});
                }
            }
            else {
                reject({error: "Invalid function parameters"});
            }
        }
        catch (error) {
            reject(error);
        }
    });
}