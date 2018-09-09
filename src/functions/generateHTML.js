import removeEmptyFromObject from './removeEmptyFromObject';

export default async function generateHTML(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let requestData = await removeEmptyFromObject({style: data.style, locale: data.locale, csl: data.csl, lang: data.lang});
            if (requestData && requestData.style && requestData.locale && requestData.locale && requestData.csl && (Object.keys(requestData.csl).length > 0)) {
                const response = await fetch("https://api.cloudcite.net/cite", {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
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
                        let generatedHTMLStart = "";
                        let generatedHTMLEnd = "";
                        if (cslIndentIndex != -1) {
                        generatedHTMLStart = generatedHTML.substring(0, cslIndentIndex - 1);
                        generatedHTMLEnd = generatedHTML.substring(cslIndentIndex, generatedHTML.length);
                        generatedHTML = generatedHTMLStart + ' style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ' + generatedHTMLEnd;
                        }
                        let cslRightInlineIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-right-inline"'): -1;
                        if (cslRightInlineIndex != -1) {
                        generatedHTMLStart = generatedHTML.substring(0, cslRightInlineIndex - 1);
                        generatedHTMLEnd = generatedHTML.substring(cslRightInlineIndex, generatedHTML.length);
                        generatedHTML = generatedHTMLStart + ' style="' + 'margin: 0 .4em 0 ' + (format.secondFieldAlign ? format.maxOffset + format.rightPadding : '0') + 'em;" ' + generatedHTMLEnd;
                        }
                        let cslLeftMarginIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-left-margin"'): -1;
                        if (cslLeftMarginIndex != -1) {
                        generatedHTMLStart = generatedHTML.substring(0, cslLeftMarginIndex - 1);
                        generatedHTMLEnd = generatedHTML.substring(cslLeftMarginIndex, generatedHTML.length);
                        generatedHTML = generatedHTMLStart + ' style="' + 'float: left; padding-right: ' + format.rightpadding + 'em;' + (format.secondFieldAlign ? 'text-align: right; width: ' + format.maxoffset + 'em;': '') + '" ' + generatedHTMLEnd;
                        }
                        html.push({id: format.entry_ids[i][0], html: generatedHTML});
                        if (format && response[1].length > 0) {
                        richTextHTML += '<div class="csl-bib-body" style="';
                        richTextHTML += ((format) ? ((format.linespacing ? ('line-height: ' + format.linespacing + '; '): '') + (format.hangingindent ? (' text-indent: -' + format.hangingindent + 'em;'): '')): '') + '">';
                        for (let i=0; i < response[1].length; i++) {
                            richTextHTML += '<div style="clear: left;';
                            richTextHTML += (format && format.entryspacing ? ('margin-bottom:' + format.entryspacing + 'em;"'): '"') + '>';
                            if (data.cslHTML[i]) {
                                richTextHTML += data.cslHTML[i];
                            }
                            richTextHTML += '</div>';
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