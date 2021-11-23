import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UnknownnProfile from '../../../images/unkown-profile.jpg'
import ChatComposer from "../chat/chatComposer";
import ChatWindow from "../chat/chatWindow";

const initialDetails = [
  {
    id: 1,
    user: "Jane Doe",
    message: "Lorem Ipsum is simply dummy text.",
    notification_count: "5",
    created_at: "03-jan-2021"
  },
  {
    id: 2,
    user: "Watson",
    message: "Lorem Ipsum is simply dummy text.",
    notification_count: "3",
    created_at: "15-jan-2021"
  },
  {
    id: 3,
    user: "John",
    message: "Lorem Ipsum is simply dummy.",
    notification_count: "2",
    created_at: "30-jan-2021"
  },
  {
    id: 4,
    user: "Mary Rosamund",
    message: "Text of the printing.",
    notification_count: "1",
    created_at: "15-mar-2021"
  },
  {
    id: 5,
    user: "Watson",
    message: "Lorem Ipsum is simply dummy text of.",
    notification_count: "10",
    created_at: "20-apr-2021"
  },
];

const messagesList = [ { text: "First stored message" },{ text: "Second stored message" }]

function ChatConversation(props) {
  const [sendMessage, setSendMessage] = useState([]);
  const [recivedMessages, setRecivedMessages] = useState(messagesList);

  const submitted = getNewMessage => {
    console.log(getNewMessage)
    console.log(getNewMessage)
    console.log(getNewMessage)
    if (getNewMessage != "") {
      const newMessage = { text: getNewMessage };
      let updatedMessages = [...sendMessage, newMessage];
      setSendMessage(updatedMessages)
    }
  };

  return (
    <div className="container">
      <div className="chat-bot">
        <div className="row">
          <div className="col-md-4" style={{paddingRight: '0px'}}>
            <div className="conversation-user-list">
              {initialDetails.map((data, key) => {
                return (
                  <div className="px-3 py-2 message-row d-flex align-items-center justify-content-between" key={key}>
                    <div className="d-flex align-items-center">
                      <img className="conver-user-img" src={UnknownnProfile} alt="user pic"/>
                      <div>
                        <div className="conversation-user">{data.user}</div>
                        <div className="conversation-message">{data.message}</div>
                        <div className="conversation-date">{data.created_at}</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="unreact_count ml-4">{data.notification_count}</div>                    
                    </div>
                  </div>
                )
              })}
            </div>
          </div> 
          <div className="col-md-8" style={{paddingLeft:'0px'}}>
           <div className="cht-header">
            <h5>John Doe</h5>
           </div>
           <div className="chat-body">
             <ChatWindow sendMessage={sendMessage} recivedMessages={recivedMessages} />
             <ChatComposer submitted={submitted} />
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatConversation;