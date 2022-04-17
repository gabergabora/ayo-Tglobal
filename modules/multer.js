const multer = require("multer")
const path = require("path")

function fileFilter (req, file, cb) {
    if(!file.mimetype.includes('image')){
        return  cb(new Error('file must be an image'), false)
      }
      return cb(null, true)
      
  }


  let loc = path.join(__dirname,'../uploads')
  console.log(loc)
  const storage = multer.diskStorage({
    destination: loc ,
    filename: function (req, file, cb) {
        cb(null, Date.now()+ '-' + req.user.email+ path.extname(file.originalname))
    }
  })

const limits = {
    fileSize : 4000000
}
  const upload = multer({ storage,limits, fileFilter})

  module.exports = upload