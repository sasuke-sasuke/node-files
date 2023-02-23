const fs = require("fs");
const axios = require("axios");

const arg = process.argv[2];

if (arg.includes("http")) {
  webCat(arg);
} else {
  cat(arg);
}

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const res = await axios.get(url);
    console.log(res);
  } catch (err) {
    console.log(`Invalid url-- code ${err.code}`);
    process.exit(1);
  }
}
