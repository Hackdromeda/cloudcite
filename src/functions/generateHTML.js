import { generateCSL } from './generateCSL';
import { cite } from './cite';

/**
 * @param {Object} style 
 * @param {Object} locale 
 * @param {Array<String>} creatorTypes
 * @param {Array<Object>} citationTray 
 */
export async function generateHTML(style, locale, creatorsTypes, citationTray) {
    let csl = generateCSL(creatorsTypes, citationTray);
    console.log(csl);
    return new Promise(async (resolve, reject) => {
        try {
            if (style && locale && csl) {
                const response = await cite(style, locale, csl);
                console.log(response)
                if (response[0] && response[1]) {
                    const format = response[0];
                    let html = [];
                    for (let i=0; i < response[1].length; i++) {
                        let generatedHTML = response[1][i];
                        let cslIndentIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML[i].indexOf('class="csl-indent"'): -1;
                        if (cslIndentIndex !== -1) {
                            generatedHTML = `${response[1][i].substring(0, cslIndentIndex - 1)} style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ${response[1][i].substring(cslIndentIndex, response[1].length)} `;
                        }
                        let cslRightInlineIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-right-inline"'): -1;
                        if (cslRightInlineIndex !== -1) {
                            generatedHTML = `${generatedHTML.substring(0, cslRightInlineIndex - 1)} style="margin: 0 .4em 0 ${format.secondFieldAlign ? format.maxOffset + format.rightPadding : '0'}em;" ${generatedHTML.substring(cslRightInlineIndex, generatedHTML.length)}`;
                        }
                        let cslLeftMarginIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-left-margin"'): -1;
                        if (cslLeftMarginIndex !== -1) {
                            generatedHTML = `${generatedHTML.substring(0, cslLeftMarginIndex - 1)} style="float: left; padding-right:${format.rightpadding}em; ${format.secondFieldAlign ? `text-align: right; width:${format.maxoffset}em;`: ''}" ${generatedHTML.substring(cslLeftMarginIndex, generatedHTML.length)}`;
                        }
                        html.push({id: format.entry_ids[i][0], html: generatedHTML});
                    }
                    resolve({format: format, html: html});
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