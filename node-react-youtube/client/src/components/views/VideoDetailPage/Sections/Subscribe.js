import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Subscribe(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false);

    //Subscribe Data DB로부터 가져오기
    useEffect( () => {

        let subscribeVariables = {
            userTo : userTo,
            userFrom : userFrom
        }
        //subscriberNumber
        Axios.post('/api/subscribe/subscriberNumber', subscribeVariables)
        .then( (response) => {
            if (response.data.success) {
                setSubscribeNumber(response.data.subscriberNumber)
            }
            else{
                alert('Failed to get subscriber Number')
            }
        } )

        Axios.post('/api/subscribe/subscribed', subscribeVariables)
        .then( (response) => {
            if (response.data.success) {
                setSubscribed(response.data.subscribed)
            }
            else{
                alert('Failed to get Subscribed Information')
            }
        } )

    }, []);

    const onSubscribe = (e) => {
        e.preventDefault();

        let subScribeVariables = {
            userTo : userTo,
            userFrom : userFrom
        }
        
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subScribeVariables)
            .then(response => {
                if(response.data.success){
                    setSubscribed(!Subscribed)
                    setSubscribeNumber(SubscribeNumber-1)
                }
                else{
                    alert('Failed to unsubscribe')
                }
            })

        }
        else{
            Axios.post('/api/subscribe/subscribe', subScribeVariables)
            .then(response => {
                if(response.data.success){
                    setSubscribed(!Subscribed)
                    setSubscribeNumber(SubscribeNumber+1)
                }
                else{
                    alert('Failed to subscribe')
                }
            })
            
        }
    }

    return (
        <div>
            <button 
            onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe