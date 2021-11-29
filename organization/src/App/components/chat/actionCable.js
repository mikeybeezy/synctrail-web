import React, {useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { userConstants } from '../../../constants';
import { connect, useSelector,  useDispatch } from 'react-redux';

function ActionCable(props) {
  const dispatch = useDispatch();

  const handleReceivedLists=(res)=> {
    dispatch({type: userConstants.NEW_MESSAGE, payload: res});
  }
  return (
    <ActionCableConsumer
    channel={{ channel: "ChatRoomChannel" }}
    onConnected={() => "Connected to server."}
    onReceived={handleReceivedLists} />
  );
}

export default ActionCable