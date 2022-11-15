import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment'

function VideoDetailPage(props) {

    const _videoId = props.match.params.videoId;
    const videoVariable = {
        videoId: _videoId
    }

    const[VideoDetail, setVideoDetail] = useState([]);

    useEffect( () => {
        Axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videoDetail);
                    setVideoDetail(response.data.videoDetail)
                }
                else{
                    alert('Failed to get video Info')
                }
            })
    }
    ,[])

    if (VideoDetail.writer) {

        //업로드한 사용자가 자기 자신을 구독할 수 없도록.
        const subscribeBtn = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        {/* <List.Item actions={ [ <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/> ] }> */}
                        <List.Item actions={ [ subscribeBtn ] }>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* Comments */}
                        <Comment />
                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    {/* SideVideo */}
                    <SideVideo />

                </Col>
            </Row>
        )
    }
    else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage