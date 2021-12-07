import React, { useState, useEffect} from 'react';
import { chatActions } from '../../../actions';
import { connect,  useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { buildFormDataFromObject } from 'shared-lib/src/formData';
import ChatComposer from "../chat/chatComposer";
import ChatWindow from "../chat/chatWindow";
import ChatUsers from "../chat/chatUsers";

function ChatConversation(props) {
  const { particpantsUsers } = props
  const dispatch = useDispatch();
  const { conversation_id } = useParams();

  useEffect(() => {
    dispatch(chatActions.getChatMessages(conversation_id));
  }, []);

  const submitted = (value) => {
    let formData = new FormData();
    buildFormDataFromObject(formData, value, "message");
    dispatch(chatActions.senderMessage(formData, conversation_id));
  };
  return (
    <div className="container">
      <div className="chat-bot">
        <div className="row">
          <div className="col-md-4" style={{paddingRight: '0px'}}>
            <ChatUsers particpantsUsers={particpantsUsers && particpantsUsers} />
          </div> 
          <div className="col-md-8" style={{paddingLeft:'0px'}}>
            <div className="cht-header">

            
              {particpantsUsers && particpantsUsers.map((data, key) => {
                return (
                   <div key={key}> {data.username} </div>
                  )
                })
              }
            </div>
            <div className="chat-body">
              <ChatWindow/>
              <ChatComposer submitted={submitted} />
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.chat.loading,
    particpantsUsers: state.chat.particpantsUsers,
  };
};

export default connect(mapStateToProps, { chatActions })(ChatConversation);
