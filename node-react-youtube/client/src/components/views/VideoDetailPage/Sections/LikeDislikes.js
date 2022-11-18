import React, { useCallback, useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {

    const [ Likes, setLikes ] = useState(0);
    const [ LikeAction, setLikeAction ] = useState(false)
    const [ Dislikes, setDislikes ] = useState(0);
    const [ DislikeAction, setDislikeAction ] = useState(false)

    let variable = {}
    if(props.video) {
        variable = {videoId: props.videoId , userId: props.userId} //VideoDetailPage.js
    }else {
        variable = {commentId: props.commentId , userId: props.userId} //SingleComment.js
    }

    //getLikes
    useEffect(()=>{
        Axios.post('/api/like/getLikes', variable)
        .then((response) => {
            if(response.data.success){
                //얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length)

                //내가 이미 좋아요를 눌렀는지
                response.data.likes.map( like => {
                    if(like.userId === props.userId)
                    setLikeAction(true)
                })

            }else{
                alert('Failed to get likes')
            }
        })
    },[])

    //getDislikes
    useEffect(()=>{
        Axios.post('/api/like/getDislikes', variable)
        .then((response) => {
            if(response.data.success){
                //얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length)

                //내가 이미 싫어요를 눌렀는지
                response.data.dislikes.map( dislikes => {
                    if(dislikes.userId === props.userId)
                    setDislikeAction(true)
                })

            }else{
                alert('Failed to get dislikes')
            }
        })
    },[])

    const onClickLikeButton = useCallback( () => {

    }, [LikeAction])
    const onClickDislikeButton = useCallback( () => {

    }, [DislikeAction])

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction ? 'filled' : 'outlined'} onClick />
                    <span style={{ paddingLeft:'8px', cursor: 'auto' }}> {Likes} </span>
                </Tooltip>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" theme={DislikeAction ? 'filled' : 'outlined'} onClick />
                    <span style={{ paddingLeft:'8px', cursor: 'auto' }}> {Dislikes} </span>
                </Tooltip>
            </span>
        </div>
    )
}

export default LikeDislikes