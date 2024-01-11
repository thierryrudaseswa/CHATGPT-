import "./App.css";
import React, { useRef, useState, useEffect } from 'react';
import gptLogo from "./assets/chatgpt.svg"
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg"
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am ChatGPT, a state-of-the-art language model developed by OpenAI.",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const addMessage = (text, isBot) => {
    setMessages([...messages, { text, isBot }]);
  }

  const handleSend = async () => {
    const text = input;
    setInput('');
    addMessage(text, false);

    const res = await sendMsgToOpenAI(text);
    addMessage(res, true);
  }

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput('');
    addMessage(text, false);

    const res = await sendMsgToOpenAI(text);
    addMessage(res, true);
  }

  return (
    <div className="App">
      <div className="sideBar">
        {/* ... (Your sidebar code remains the same) */}
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img src={message.isBot ? gptImgLogo : userIcon} alt="" className="chatImg" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="send a message" value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>ChatGPT may provide information about various topics.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
