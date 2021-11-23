import React, {useState, useEffect} from 'react';
import { connect,  useDispatch } from 'react-redux';
import { clientActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../chat/searchBar";

const initialDetails = [
  {
    id: 1,
    user: "Jane Doe, Mary Rosamund",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    notification_count: "5",
    created_at: "03-jan-2021"
  },
  {
    id: 2,
    user: "Mary Rosamund, Sherlock, Watson",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    notification_count: "3",
    created_at: "15-jan-2021"
  },
  {
    id: 3,
    user: "Mary Rosamund, Sherlock, John",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    notification_count: "2",
    created_at: "30-jan-2021"
  },
  {
    id: 4,
    user: "Mary Rosamund, Mycroft",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    notification_count: "1",
    created_at: "15-mar-2021"
  },
  {
    id: 1,
    user: "Mary Rosamund, Sherlock, Watson",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    notification_count: "10",
    created_at: "20-apr-2021"
  },
];


function ChatHistory(props) {
  const { currentClient } = props
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const filterNames = ({ user }) => {
    return user.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-10 col-md-auto">
         <SearchBar onSearch={setSearchValue} value={searchValue} />
          <h5 className="mt-4 mb-2">{initialDetails.length} Conversation</h5> 
          <div className="message-history">
            {initialDetails.filter(filterNames).map((data, key) => {
              return (
                <div className="message-row d-flex align-items-center justify-content-between" key={key}>
                  <div>
                    <div className="conversation-user">{data.user}</div>
                    <div className="conversation-message">{data.message}</div>
                    <div className="conversation-date">{data.created_at}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="unreact_count mx-4">{data.notification_count}</div>
                    <Button variant="primary" size="sm">View</Button>
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

export default ChatHistory
