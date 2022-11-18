const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/DisLike");
const { auth } = require("../middleware/auth");



//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }
    else{
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable)
    .exec((err,likes) => {
        if(err) return res.json( { success: false, err } )
        return res.status(200).json( { success: true, likes} )
    })

});

router.post("/getDislikes", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }
    else{
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
    .exec((err, dislikes) => {
        if(err) return res.json( { success: false, err } )
        return res.status(200).json( { success: true, dislikes} )
    })

});


router.post("/upLike", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }
    else{
        variable = {commentId: req.body.commentId}
    }
    //Like collection에 클릭 정보 넣는다.
    const like = new Like(variable)
    like.save( (err, likeResult) => {
        if(err) return res.json( { success: false, err } )

        // Dislike가 이미 클릭되어있으면 Dislike취소
        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({success: false, err})
                res.status(200).json({ success: true})
            })
    })
});

router.post("/unLike", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }
    else{
        variable = {commentId: req.body.commentId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, unLikeResult) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success: true})
        })
})

router.post("/upDislike", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }
    else{
        variable = {commentId: req.body.commentId}
    }
    //Dislike collection에 클릭 정보 넣는다.
    const dislike = new Dislike(variable)
    dislike.save( (err, dislikeResult) => {
        if(err) return res.json( { success: false, err } )

        // DLike가 이미 클릭되어있으면 Dislike취소
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({success: false, err})
                res.status(200).json({ success: true})
            })
    })
});

router.post("/unDislike", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }
    else{
        variable = {commentId: req.body.commentId}
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, undisLikeResult) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success: true})
        })
})


module.exports = router;
