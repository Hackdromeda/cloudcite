//@ts-ignore
import _ from 'lodash'
//@ts-ignore
import rp from 'request-promise-native';
import store from '../store';

export default async function generateHTML(data: any) {
    var requestData = _.pickBy({style: data.style, locale: data.locale, csl: data.csl, lang: data.lang})
    if (requestData && requestData.style && requestData.locale && requestData.locale && requestData.csl && (Object.keys(requestData.csl).length > 0)) {
        try {
            const response = await rp({
                uri: 'https://api.cloudcite.net/cite',
                headers: {
                  'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                method: 'POST',
                //@ts-ignore
                body: requestData,
                json: true
                //@ts-ignore
            });
            if (response[0] && response[1].length > 0) {
                const format = response[0];
                var html = [];
                var richTextHTML = "";
                for (let i=0; i < response[1].length; i++) {
                  var generatedHTML = response[1][i];
                  var cslIndentIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML[i].indexOf('class="csl-indent"'): -1;
                  var generatedHTMLStart = ""
                  var generatedHTMLEnd = ""
                  if (cslIndentIndex != -1) {
                    generatedHTMLStart = generatedHTML.substring(0, cslIndentIndex - 1);
                    generatedHTMLEnd = generatedHTML.substring(cslIndentIndex, generatedHTML.length);
                    generatedHTML = generatedHTMLStart + ' style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ' + generatedHTMLEnd;
                  }
                  var cslRightInlineIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-right-inline"'): -1;
                  if (cslRightInlineIndex != -1) {
                    generatedHTMLStart = generatedHTML.substring(0, cslRightInlineIndex - 1);
                    generatedHTMLEnd = generatedHTML.substring(cslRightInlineIndex, generatedHTML.length);
                    generatedHTML = generatedHTMLStart + ' style="' + 'margin: 0 .4em 0 ' + (format.secondFieldAlign ? format.maxOffset + format.rightPadding : '0') + 'em;" ' + generatedHTMLEnd;
                  }
                  var cslLeftMarginIndex = (generatedHTML && generatedHTML[i]) ? generatedHTML.indexOf('class="csl-left-margin"'): -1;
                  if (cslLeftMarginIndex != -1) {
                    generatedHTMLStart = generatedHTML.substring(0, cslLeftMarginIndex - 1);
                    generatedHTMLEnd = generatedHTML.substring(cslLeftMarginIndex, generatedHTML.length);
                    generatedHTML = generatedHTMLStart + ' style="' + 'float: left; padding-right: ' + format.rightpadding + 'em;' + (format.secondFieldAlign ? 'text-align: right; width: ' + format.maxoffset + 'em;': '') + '" ' + generatedHTMLEnd;
                  }
    
                  html.push({id: format.entry_ids[i][0], html: generatedHTML});
                  if (format && response[1].length > 0) {
                    //@ts-ignore
                    richTextHTML += '<div class="csl-bib-body" style="';
                    //@ts-ignore
                    richTextHTML += ((format) ? ((format.linespacing ? ('line-height: ' + format.linespacing + '; '): '') + (format.hangingindent ? (' text-indent: -' + format.hangingindent + 'em;'): '')): '') + '">';
                    //@ts-ignore
                    for (let i=0; i < response[1].length; i++) {
                        richTextHTML += '<div style="clear: left;';
                        //@ts-ignore
                        richTextHTML += (format && format.entryspacing ? ('margin-bottom:' + format.entryspacing + 'em;"'): '"') + '>';
                        //@ts-ignore
                        richTextHTML += data.cslHTML[i];
                        richTextHTML += '</div>';
                    }
                    richTextHTML += '</div>';
                  }
                }
                return {format: format, html: html, richTextHTML: richTextHTML};
            }
            else {
                store.dispatch('setMessage', {description: "There has been an error in processing your request. Please send us detailed feedback about the problem that occurred and the procedure for duplicating the issue.", type: "error"})
                return {error: "HTML can not be generated"};
            }
        }
        catch (error) {
            console.log(error)
            store.dispatch('setMessage', {description: error.explanation, type: "error"})
            return {error: error};
        }
    }
    else {
        store.dispatch('setMessage', {description: "There has been an error in processing your request. Please send us detailed feedback about the problem that occurred and the procedure for duplicating the issue.", type: "error"})
        return {error: "Invalid function parameters"};
    }
}