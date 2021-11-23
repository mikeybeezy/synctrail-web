import React from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchBar(props) {
  return (
    <div className="histroy-header">
      <input
        type="text"
        name="text"
        placeholder="Search Conversation..."
        onChange={(e) => props.onSearch(e.target.value)}
        value={props.value}
        className="search_history"
      />
      <Link to="/admin/chat-history/conversation">
        <Button variant="primary" size="sm" className="conversation-btn"> Start Conversation </Button>
      </Link>
    </div>
  );
}

export default SearchBar;