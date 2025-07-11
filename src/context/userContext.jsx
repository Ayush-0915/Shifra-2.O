import React, { createContext, useState } from 'react'
import run from '../gemini';
export const dataContext = createContext()

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false)
  let [prompt, setPrompt] = useState("listening...")
  let [response, setResponse] = useState(false)
  let [showButton, setShowButton] = useState(false);


  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'hi-GB';
    window.speechSynthesis.speak(text_speak)
  }

  async function aiResponse(prompt) {
    let text = await run(prompt)
    // Replace 'google' (case-insensitive) with 'Ayush Singh'
    let newText = text.replace(/google/gi, 'Ayush Singh')
    setPrompt(newText)
    speak(newText)
    setResponse(true);
    setShowButton(false); // Hide button while responding
    setTimeout(() => {
      setResponse(false);
    }, 5000) // 5000 ms = 5 seconds
  }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  let recognition = new speechRecognition()
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex
    let transcript = e.results[currentIndex][0].transcript
    setPrompt(transcript)
    takeCommand(transcript.toLowerCase())
  }

  function takeCommand(command) {
    if (
      command.includes("your name") ||
      command.includes("who are you") ||
      command.includes("what is your name")
    ) {
      speak("My name is Shifra");
      setPrompt("My name is Shifra");
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank")
      speak("Opening YouTube")
      setPrompt("Opening YouTube....")
      setResponse(true)
      setTimeout(() => {
        setSpeaking(false)
        startListening();
      }, 5000)
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank")
      speak("Opening Google")
      setPrompt("Opening Google....")
      setResponse(true)
      setTimeout(() => {
        setSpeaking(false)
        startListening();
      }, 5000)
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank")
      speak("Opening Instagram")
      setPrompt("Opening Instagram....")
      setResponse(true)
      setTimeout(() => {
        setSpeaking(false)
        startListening();
      }, 5000)
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
      speak(time)
      setPrompt(time)
      setResponse(true)
      setTimeout(() => {
        setSpeaking(false)
        startListening();
      }, 5000)
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
      speak(date)
      setPrompt(date)
      setResponse(true)
      setTimeout(() => {
        setSpeaking(false)
        startListening();
      }, 5000)
    } else {
      aiResponse(command)
    }
  }

  function startListening() {
    setSpeaking(true);
    setPrompt("listening...");
    try {
      recognition.start();
    } catch (e) {
      // Already started, ignore error
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
    showButton,
    setShowButton,
    startListening // Ensure this is provided to context
  }

  return (
    <div>
      <dataContext.Provider value={value}>
        {children}
      </dataContext.Provider>
    </div>
  )
}

export default UserContext