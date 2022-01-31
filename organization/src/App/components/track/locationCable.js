import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { userConstants } from '../../../constants';
import { chatActions } from '../../../actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function ActionCable(props) {
  const dispatch = useDispatch();
  // const { client_id } = useParams();
  const client_id = 0
  const handleReceivedLists=(res)=> {
    console.log("res................")
    console.log(res)
    console.log(res)
    console.log("res................")
    dispatch({type: userConstants.GUARD_LOCATIONS, payload: res});
  }
  return (
    <ActionCableConsumer
    key={client_id}
    channel={{ channel: "LocationChannel", room_id: client_id }}
    onConnected={() => "Connected to server."}
    onReceived={handleReceivedLists} />
  );
}

export default ActionCable