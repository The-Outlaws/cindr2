import React from 'react';

export const MatchRequest = props => {
  console.log(props);
  const { filteredConvo, handleAccept, handleReject } = props;
  return (
    <div className="match-req-container">
      <div className="match-request">
        <h4>
          <img className="chat-av" src={filteredConvo[0].user.avatar} /> Your
          request to chat from {filteredConvo[0].user.firstName} is awaiting
          your approval!
        </h4>
        <div id="heading">
          <img src={filteredConvo[0].user.photo} alt="No photo" />
          <h4>{filteredConvo[0].user.firstName}</h4>
          <div className="match-req-info">
            <p>Age: {filteredConvo[0].user.age}</p>
            <p>Gender: {filteredConvo[0].user.gender}</p>
            <p>Orientation: {filteredConvo[0].user.orientation}</p>
            <p>Height: {filteredConvo[0].user.height}</p>
          </div>
          <div>
            <div className="button-req">
              <button
                id="accept"
                type="submit"
                onClick={evt => handleAccept(evt, filteredConvo[0].id)}
              >
                Accept match request
              </button>
              <button
                id="reject"
                type="submit"
                onClick={evt => handleReject(evt, filteredConvo[0].id)}
              >
                Decline match request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
