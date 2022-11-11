const express = require('express');
const router = express.Router();
const path = require('path');
// const { Video } = require("../models/User");

const { auth } = require("../middleware/auth");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             VIdeo
//=================================

router.post("/uploadfiles", (req, res) => {
    //클라이언트로부터 받은 비디오 파일을 서버에 저장
    upload(req, res, err => {
        if(err) return res.json({success: false, err});

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
});



module.exports = router;
