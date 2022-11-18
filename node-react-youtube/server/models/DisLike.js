const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disLikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videold: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
}, { timestamps: true })

const Dislike = mongoose.model('Dislike', disLikeSchema);

module.exports = { Dislike }