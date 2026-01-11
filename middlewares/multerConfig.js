

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check mime type
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type"))
        }

        // check file size
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            return cb(new Error("File size exceeds limit"))
        }
        // Set destination
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

module.exports = {
    multer,
    storage
}