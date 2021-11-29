import React, { useState, useEffect} from 'react';
import { connect,  useDispatch } from 'react-redux';
import { chatActions } from '../../../actions';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../chat/searchBar";
import Select from "react-select";
import ReactHtmlParser from 'react-html-parser'
import dateFormat from "dateformat";

function ChatHistory(props) {
  const dispatch = useDispatch();
  const { chatHistory, chatUsers } = props

  useEffect(() => {
    dispatch(chatActions.getChatUsers());
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-10 col-md-auto">
         <SearchBar organizationUser={chatUsers && chatUsers}/>
          <h5 className="mt-4 mb-2">{chatHistory&&chatHistory.length} Conversation</h5> 
          <div className="message-history">
           {chatHistory && chatHistory.map((data, key) => {
              return (
                <div  className="message-row d-flex align-items-center justify-content-between"> 
                  <div>
                    <div className="d-flex" key={key}>
                      {data.conversation_participants.map((cp) => {
                        return (
                          <div className="conversation-user"> {cp.user.username} , </div>
                        )
                      })}
                    </div>
                      {data.latest_messages.map((me, index, {length}) => {
                        if(index + 1 === length) {
                          return (
                            <div>
                              <div className="conversation-message">{ReactHtmlParser(me.content)}</div>
                              <div className="conversation-date">{dateFormat(me.created_at, "mmmm dd yyyy - h:MM TT")}</div>
                            </div>
                          )
                        }
                      })}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="unreact_count mx-4">5</div>
                     <Link to={`/admin/chats/${data.id}`}>
                      <Button variant="primary" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.chat.loading,
    chatUsers: state.chat.chatUsers,
    chatHistory: state.chat.chatHistory
  };
};

export default connect(mapStateToProps, { chatActions })(ChatHistory);
