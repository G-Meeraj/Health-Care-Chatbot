import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! I am eAsha Health Care. How can I assist you today?" }
    ]);
    
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const sendMessage = async () => {
        if (!input.trim()) return;
    
        let userMessage = input.trim();
        
        // Check if input contains "I am"
        let extractedMessage = userMessage;
        const match = userMessage.match(/\bI am\b (.*)/i); // Extracts text after "I am"
        if (match) {
            extractedMessage = match[1]; // Gets the symptom or phrase after "I am"
        }
    
        const newMessages = [...messages, { sender: "user", text: userMessage }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);
    
        try {
            const response = await fetch("http://127.0.0.1:5000/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: extractedMessage }) // Send extracted message
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setMessages([...newMessages, { sender: "bot", text: data.response }]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages([...newMessages, { sender: "bot", text: "Error: Unable to reach chatbot." }]);
        }
        setIsTyping(false);
    };
    

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const sendQuickOption = (option) => {
        setInput(option);
        sendMessage();
    };
    
    return (
        <>
            <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
    💬
</div>


            {isOpen && (
                <div className="chatbot-container">
                    <div className="chat-header">eAsha Health Assistant <button onClick={() => setIsOpen(false)}>✖</button>

                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}-message`}>
                                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="chat-message bot-message">Bot: Typing...</div>}
                    </div>
                     <div className={`quick-options ${messages.length > 1 ? "show" : ""}`}>
                        <button onClick={() => sendQuickOption("Doctor")}>
                            🩺<br/>Doctor
                        </button>
                        <button onClick={() => sendQuickOption("Medicine")}>
                            💊<br/>Medicine
                        </button>
                        <button onClick={() => sendQuickOption("Appointment")}>
                            📅<br/>Appointment
                        </button>
                    </div>
                    <div className="chat-input">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask me about health..." />
                        <button onClick={sendMessage}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
};



export default Chatbot;
