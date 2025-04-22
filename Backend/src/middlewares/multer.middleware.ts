import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `audio-${Date.now()}${ext}`;
      cb(null, filename);
    },
  });

const upload = multer({ storage: storage })

export default upload