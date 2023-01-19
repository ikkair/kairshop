const multer = require("multer");
const storage = multer.diskStorage({
    destination: __dirname + "../../uploads/",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        type = file.mimetype.replaceAll("/",".")
        cb(null, file.fieldname + '-' + uniqueSuffix + type)
    },
})

const limits = {
    fileSize: 2097152
}

const fileFilter = (req, file, cb) => {
    fileType = ["jpg", "png", "jpeg"];
    type = file.mimetype;
    isOk = false;
    fileType.forEach(element => {
        if(type.includes(element)){
            isOk = true;
        }
    });
    if (isOk){
        return cb(null, true);
    }
    return cb(new Error("File type is not allowed"))
}
const upload = multer({storage: storage, limits:limits, fileFilter:fileFilter})

module.exports = upload;

// {
//     storage: storage,
//     limits: {
//       fileSize: maxSize,
//     },
//     fileFilter: (req, file, cb) => {
//       const acceptedTypeFile = ['jpg', 'png', 'jpeg'];
//       // Get Extension file
//       const extFile = path.extname(file.originalname).split('.')[1];
//       if (!acceptedTypeFile.includes(extFile.toLowerCase())) {
//         return cb(new HttpException(422, 'File should png or jpg! '));
//       }
//       cb(null, file);
//     },
//   }