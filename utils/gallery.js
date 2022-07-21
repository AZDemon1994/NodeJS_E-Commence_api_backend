const fs = require('fs');

const saveFile = async (req, res, next) => {
    if (req.files) {
        if (req.files.file) {
            let file = req.files.file;
            let filename = new Date().valueOf() + "_" + file.name
            file.mv(`./uploads/${filename}`);
            req.body["image"] = filename;
            next();
        } else {
            next(new Error("Image is Require!"))
        }
    } else {
        next(new Error("Image is Require!"))
    }
}

const saveFiles = async (req, res, next) => {
    let filenames = [];
    let files = req.files.files;
    files.forEach((file) => {
        let filename = new Date().valueOf() + "_" + file.name;
        file.mv(`./uploads/${filename}`);
        filenames.push(filename);
    });
    req.body["images"] = filenames.join(',');
    next();
}

const deleteFile = async (filename) => {
    await fs.unlinkSync(`./uploads/${filename}`);
}

module.exports = {
    saveFile,
    saveFiles,
    deleteFile
}