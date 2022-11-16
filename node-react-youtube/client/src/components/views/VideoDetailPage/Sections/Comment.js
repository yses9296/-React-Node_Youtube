import React, { useCallback, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
const { TextArea } = Input;

function Comment(props) {
    let user = useSelector(state => state.user)

    const [Comment, setComment] = useState('');
    const handleChange = useCallback((e) => {setComment(e.target.value)},[])
    const onSubmit = (e) => {
        e.preventDefault();

        let variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.result)
                props.refreshFunction(response.data.result);
                setComment('')
            }
            else{
                alert('Failed to save Comment')
            }
        })
    }


    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>

            {/* Comment lists */}
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}  />
                    </React.Fragment>
                    
                )

            ))}


            {/* Root comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={Comment}
                        placeholder="write some comments"/>
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
    }

export default Comment