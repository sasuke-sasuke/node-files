const fs = require("fs");
const axios = require("axios");

const arg = process.argv[2];
let output;
let path;

if (arg === "--out") {
  output = process.argv[3];
  path = process.argv[4];
} else {
  path = arg;
}
if (path.includes("http")) {
  webCat(path, output);
} else {
  cat(path, output);
}

function cat(path, out) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("CAT ERROR", err);
      process.exit(1);
    }
    if (out) {
      write(data, out);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, out) {
  try {
    const res = await axios.get(url);
    if (out) {
      write(res, out);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(`Invalid url-- code ${err.code}`);
    process.exit(1);
  }
}

function write(output, path) {
  fs.writeFile(path, output, "utf8", (err) => {
    if (err) {
      console.log("Something Went Wrong lol", err.code);
      process.exit(1);
    }
    console.log("FILE WRITTEN SUCCESSFULLY!");
  });
}
