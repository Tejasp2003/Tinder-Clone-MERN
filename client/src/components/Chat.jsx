import React from 'react'

const Chat = ({descendingOrderMessages, clickedUser, user}) => {

  return (
    <>
        <div className="chat-display">
            {descendingOrderMessages.map((message, _index) => (
                

                <div key={_index} className="chat-wrapper" >
                    <div className="chat-message-header">
                        <div className="img-container">
                            <img src={message.img} alt={message.name + ' profile'}/>
                        </div>
                        <p>{message.name}</p>
                    </div>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    </>
)
}

export default Chat