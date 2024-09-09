import "./App.css";
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";

function App() {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [typedText, setTypedText] = useState(""); // State for typed text
  const [darkMode, setDarkMode] = useState(false); // State for Dark Mode

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleTextChange = (e) => {
    setTypedText(e.target.value); // Update typedText state
    setTextToCopy(e.target.value); // Sync textToCopy with typedText
  };

  const clearText = () => {
    setTextToCopy("");
    setTypedText(""); // Clear both speech and typed text
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to add/remove dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support Speech Recognition.</p>;
  }

  return (
    <div className="container">
      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <h2>Speech to Text Converter</h2>
      <p>Convert speech from the microphone to text and type to add or edit.</p>

      <textarea
        value={typedText || transcript} // Display either typed text or speech transcript
        onChange={handleTextChange}
        placeholder="Type or speak here..."
      />

      <div className="btn-style">
        <button onClick={setCopied}>{isCopied ? "Copied!" : "Copy to clipboard"}</button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
        <button onClick={clearText}>Clear</button> {/* Clear button */}
      </div>
    </div>
  );
}

export default App;
