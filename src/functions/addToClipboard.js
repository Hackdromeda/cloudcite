//Modified version of code from https://gist.github.com/lgarron/d1dee380f4ed9d825ca7
export function addToClipboard(textPlain, textHTML) {
    return new Promise(function(resolve, reject) {
      var success = false;
      function listener(e) {
        e.clipboardData.setData("text/plain", textPlain);
        e.clipboardData.setData("text/html", textHTML)
        e.preventDefault();
        success = true;
      }
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
      success ? resolve(): reject();
    });
};