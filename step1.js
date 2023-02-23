const fs = require("fs");

const filePath = process.argv[2];

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

cat(filePath);
