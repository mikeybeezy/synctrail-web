import React, { Component } from "react";
import { connect  } from 'react-redux';
import ReactHtmlParser from 'react-html-parser'
import dateFormat from "dateformat";

class ChatWindow extends Component {

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.getMessages !== prevProps.getMessages) {
      this.messageListEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    const { getMessages, currentUser } = this.props;
    return (
      <div className="chat-window">
        <div className="box">
          <div className="inner">
            {getMessages && getMessages.map((data, index) => {
              return (
                <div key={index}>
                  <li className= {currentUser && currentUser.id === data.user_id ? "chat-right" : "chat-left"}>
                    <div>
                      <div className="chat-text">
                        {ReactHtmlParser(data.content)}
                        {data.file.url ? 
                          <img src={data.file.url}  alt="img" className="chat-image "/>
                          : null
                        }
                      <div className="date-format">{dateFormat(data.created_at, "mmm-dd-yyyy - h:MM TT")}</div>
                      </div>
                      <div className="chat-user-name">{data.user && data.user.username}</div>
                    </div>
                  </li>
                </div>
              )
            })}
            <div
              className="reference"
              ref={node => (this.messageListEnd = node)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getMessages: state.chat.getMessages,
    currentUser: state.initial.currentUser
  };
};

export default connect(mapStateToProps, { })(ChatWindow);
