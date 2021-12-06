import React, {useState, useEffect} from 'react';
import UnknownnProfile from '../../../images/unkown-profile.jpg'

function ChatUsers(props) {
  const { particpantsUsers } = props
  return (
    <div className="conversation-user-list">
      <div className="cht-header"><h6>Group chats</h6></div>
      {particpantsUsers && particpantsUsers.map((data, key) => {
        return (
          <div className="px-3 py-2 message-row d-flex align-items-center justify-content-between" key={key}>
            <div className="d-flex align-items-center">
              <img className="conver-user-img" src={UnknownnProfile} alt="user pic"/>
              <div>
                <div className="conversation-user">{data.username}</div>
                <div className="conversation-date">{data.email}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ChatUsers