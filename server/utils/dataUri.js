const DatauriParser = require("datauri/parser");
const path = require("path");
module.exports = getDataUri = (file) => {
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
