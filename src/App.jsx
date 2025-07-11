import React, { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/userContext';
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"
function App() {
  let { speaking, prompt, response, setPrompt, setResponse, startListening, showButton } = useContext(dataContext)

  return (
    <div className='main'>
      <img src={va} alt="" id='shifra' />
      <span>I'm Shifra, Your Advance Virtual Assistant</span>
      {(!speaking || showButton) ? (
        <button onClick={() => {
          setPrompt("listening...");
          setResponse(false);
          startListening();
        }}>Click here <CiMicrophoneOn /></button>
      ) : (
        !showButton && (
          <div className='response'>
            {!response ? <img src={speakimg} alt="" id="speak" />
              :
              <img src={aigif} alt="" id="aigif" />}
            <p>{prompt}</p>
          </div>
        )
      )}
    </div>
  )
}

export default App