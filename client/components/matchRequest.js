import React from 'react';

export const MatchRequest = props => {
  console.log(props);
  const { filteredConvo, handleAccept, handleReject } = props;
  return (
    <div className="match-req-container">
      <div className="match-request">
        <h4>
          <img className="chat-av" src={filteredConvo.user.avatar} /> Your
          request to chat from {filteredConvo.user.firstName} is awaiting
          your approval!
        </h4>
        <div id="heading">
          <img src={filteredConvo.user.photo} alt="No photo" />
          <h4>{filteredConvo.user.firstName}</h4>
          <div className="match-req-info">
            <p>Age: {filteredConvo.user.age}</p>
            <p>Gender: {filteredConvo.user.gender}</p>
            <p>Orientation: {filteredConvo.user.orientation}</p>
            <p>Height: {filteredConvo.user.height}</p>
          </div>
          <div>
            <div className="button-req">
              <button
                id="accept"
                type="submit"
                onClick={evt => handleAccept(evt, filteredConvo.id)}
              >
                Accept match request
              </button>
              <button
                id="reject"
                type="submit"
                onClick={evt => handleReject(evt, filteredConvo.id)}
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
