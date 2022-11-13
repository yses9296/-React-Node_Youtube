import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';

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

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item actions>
                            <List.Item.Meta
                                avatar={ <Avatar src={VideoDetail.writer.image} /> }
                                title ={VideoDetail.writer.title}
                                description = {VideoDetail.writer.description}>

                            </List.Item.Meta>
                        </List.Item>

                        {/* Comments */}
                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    {/* <SideVideo /> */}

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