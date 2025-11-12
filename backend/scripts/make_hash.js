const bcrypt = require("bcrypt");
const pwd = process.argv[2];
if (!pwd) {
  console.error("Uso: node app/scripts/make_hash.js <password>");
  process.exit(1);
}
bcrypt.hash(pwd, 10).then(h => {
  console.log("Hash bcrypt:\n", h);
});
