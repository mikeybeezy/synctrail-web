import React, { Component } from "react";


export default class ChatWindow extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.sendMessage !== prevProps.sendMessage) {
      this.messageListEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    const {sendMessage, recivedMessages} = this.props;
    return (
      <div className="chat-window">
        <div className="box">
          <ul className="inner">
            {Array.isArray(recivedMessages) &&
              recivedMessages.map((oneMessage, index) => (
                <div key={index}>
                  <li  className="chat-left">
                    <div className="chat-text">{oneMessage.text}</div>

                  </li>
                </div>
              ))
            }
            {Array.isArray(sendMessage) &&
              sendMessage.map((oneMessage, index) => (
                <div key={index}>
                  <li  className="chat-right">
                    <div className="chat-text">{oneMessage.text}</div>
                    <img src={oneMessage.text}  alt="img" className="chat-image"/>
                  </li>
                </div>
              ))}
            <div className="reference" ref={node => (this.messageListEnd = node)}/>
          </ul>

        </div>
      </div>
    );
  }
}
