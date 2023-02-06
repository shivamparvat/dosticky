const multer = require("multer");

const storage = multer.memoryStorage()

exports.singleUpload = multer({ storage }).single('file')
exports.multipleUpload = multer({ storage }).array('files', process.env.NUMBER_OF_FILE_UPLOAD);
