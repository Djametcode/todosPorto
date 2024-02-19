import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '/tmp')
    },
    filename(req, file, callback) {
        callback(null, file.originalname + '_' + Date.now())
    },
})

export const upload = multer({ storage: storage, limits: { fileSize: 100000 } })