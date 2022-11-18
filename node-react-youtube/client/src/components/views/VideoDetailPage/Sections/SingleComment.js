import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;

function SingleComment(props) {
    let user = useSelector(state => state.user)

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setcommentValue] = useState('');

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    const handleChange = (e) => {
        setcommentValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
   
        let variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.result);
                props.refreshFunction(response.data.result);
                setcommentValue('')
                setOpenReply(false)
            }
            else{
                alert('Failed to save Comment')
            }
        })
    }
    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />,
        <span onClick={onClickReplyOpen} key="comment-basic-replay-to">Reply to</span>
    ]

    return (
        <div>
            <Comment 
                actions = {actions}
                author = {props.comment.writer.name}
                avatar = {<Avatar src = {props.comment.writer.image} alt />}
                content = {<p>{props.comment.content}</p>}
            />
            {OpenReply && (
                <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
                    <TextArea style={{ width: '100%', borderRadius: '5px' }}
                            onChange={handleChange}
                            value={CommentValue}
                            placeholder="write some comments"/>
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={handleSubmit}>Submit</Button>
                </form>
            )}

        </div>
    )
}

export default SingleComment