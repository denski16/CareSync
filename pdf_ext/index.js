const { PdfReader } = require('pdfreader');

function extract(file) {
  return new Promise((resolve) => {
    let text = [];
    new PdfReader().parseFileItems(file, (err, item) => {
      if (err) {
        console.error("error:", err);
        resolve();
      } else if (!item) {
        console.log("\n=== " + file + " ===");
        console.log(text.join(" "));
        resolve();
      } else if (item.text) {
        text.push(item.text);
      }
    });
  });
}

async function main() {
    await extract('c:\\Users\\denkn\\CareSync\\CCS DOCU ITP411.03.Teriyaki.System Architecture.pdf');
    await extract('c:\\Users\\denkn\\CareSync\\CCS DOCU ITP411.03.Teriyaki.ERD.pdf');
    await extract('c:\\Users\\denkn\\CareSync\\CCS DOCU ITP411.03.Teriyaki.SITEMAP.pdf');
}
main();
