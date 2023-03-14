import { useState} from 'react'
import axios from 'axios'

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [input, setInput] = useState("")
    const user_id = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: user_id,
            to_userId: clickedUserId,
            message: input
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setInput("")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="chat-input">
            <input value={input} onChange={(e) => setInput(e.target.value)}/>
            <button className="secondary-button" onClick={addMessage}>Send</button>
        </div>
    )
}

export default ChatInput