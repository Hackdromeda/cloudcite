//@ts-ignore
import _ from 'lodash'
//@ts-ignore
import rp from 'request-promise-native';

export default async function generateHTML(data: any) {
    try {
        const response = await rp({
                                uri: 'https://api.cloudcite.net/cite',
                                headers: {
                                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                                },
                                method: 'POST',
                                body: _.pickBy({style: data.style, locale: data.locale, csl: data.csl, lang: data.lang}),
                                json: true
                            })
        const format = response[0]
        var generatedHTML = response[1]
        var generatedHTMLStart = ""
        var generatedHTMLEnd = ""
        var cslIndentIndex = generatedHTML.indexOf('class="csl-indent"')
        if (cslIndentIndex != -1) {
            generatedHTMLStart = generatedHTML.substring(0, cslIndentIndex - 1)
            generatedHTMLEnd = generatedHTML.substring(cslIndentIndex, generatedHTML.length)
            generatedHTML = generatedHTMLStart + ' style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ' + generatedHTMLEnd
        }
        var cslRightInlineIndex = generatedHTML.indexOf('class="csl-right-inline"')
        if (cslRightInlineIndex != -1) {
            generatedHTMLStart = generatedHTML.substring(0, cslRightInlineIndex - 1)
            generatedHTMLEnd = generatedHTML.substring(cslRightInlineIndex, generatedHTML.length)
            generatedHTML = generatedHTMLStart + ' style="' + 'margin: 0 .4em 0 ' + (format.secondFieldAlign ? format.maxOffset + format.rightPadding : '0') + 'em;" ' + generatedHTMLEnd
        }
        var cslLeftMarginIndex = generatedHTML.indexOf('class="csl-left-margin"')
        if (cslLeftMarginIndex != -1) {
            generatedHTMLStart = generatedHTML.substring(0, cslLeftMarginIndex - 1)
            generatedHTMLEnd = generatedHTML.substring(cslLeftMarginIndex, generatedHTML.length)
            generatedHTML = generatedHTMLStart + ' style="' + 'float: left; padding-right: ' + format.rightpadding + 'em;' + (format.secondFieldAlign ? 'text-align: right; width: ' + format.maxoffset + 'em;': '') + '" ' + generatedHTMLEnd
        }
        return {format: format, html: generatedHTML}
    }
    catch (error) {
        return {error: error}
    }
}