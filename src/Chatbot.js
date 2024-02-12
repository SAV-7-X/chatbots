import React, { useState, useEffect } from 'react';
import axios from 'axios';
import prettier from 'prettier';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chatbot.css';

const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key
const SYSTEM_PROMPT = "Greetings, mademoiselle! Let's turn that frown upside down with a bit of humor!";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: "Hi! I'm Aria, your personalized chatbot." },
    { role: 'assistant', content: 'How can I help you today?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const activated = params.get('activated');
    if (!activated) {
      window.open('/', '_self');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTyping(true);

    const newChat = [{ role: 'user', content: userInput }];

    setChatHistory((prev) => [...prev, ...newChat]);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [...chatHistory, ...newChat],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const generatedResponse = response.data.choices[0].message;

    // Customize the response based on user preferences
    const personalizedResponse = personalizeResponse(generatedResponse);

    setChatHistory((prev) => [...prev, personalizedResponse]);
    setTyping(false);

    setUserInput('');

    setTimeout(() => {
      setButtonDisabled(false); // Enable the button after 5 seconds
    }, 2000);
  };

  // Function to personalize the response
  const personalizeResponse = (response) => {
    // Check if response is a string
    if (typeof response !== 'string') {
      // If not, return response as is
      return response;
    }

    // Check if response contains code
    const codeRegex = /```javascript\n([\s\S]*?)\n```/;
    const codeMatch = response.match(codeRegex);

    if (codeMatch) {
      // Format the code using prettier
      const formattedCode = prettier.format(codeMatch[1], {
        parser: 'babel',
        semi: false,
        singleQuote: true,
      });

      // Replace the original code with the formatted code
      response = response.replace(codeRegex, '```javascript\n' + formattedCode + '\n```');
    }

    // Example: Check for keywords and add emojis or GIFs accordingly
    const keywordsToEmojis = {
      happy: '😄',
      sad: '😢',
      love: '❤️',
    };

    const words = response.split(' ');
    const personalizedResponse = words.map((word) => {
      const emoji = keywordsToEmojis[word.toLowerCase()];
      return emoji ? `${word} ${emoji}` : word;
    });

    return personalizedResponse.join(' ');
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-primary text-center mb-4 mt-0">Your Personalized Chatbot</h5>
          <ul className="list-unstyled mb-0">
            {chatHistory.map((item, index) => (
              <li key={index} className={`mb-1 ${item.role === 'assistant' ? 'text-muted' : ''}`}>
                {item.role === 'assistant' ? (
                  <>
                    <strong>Aria:</strong> {item.content}
                  </>
                ) : item.content === SYSTEM_PROMPT ? (
                  <>
                    <strong>Aria:</strong> {item.content}
                  </>
                ) : (
                  <>
                    <strong>You:</strong> {item.content}
                  </>
                )}
              </li>
            ))}
          </ul>
          {typing && <div className="spinner-border text-primary mt-2 "></div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 animate__animated animate__fadeInUp">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message here..."
                aria-label="Recipient's username with two button addons"
                aria-describedby="button-addon1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" id="button-addon1" disabled={buttonDisabled}>
                Send
              </button>
            </div>
          </form>
          {/* Add a message to indicate the user when the assistant is typing */}
          {typing && <div className="mt-2 animate__animated animate__flash">Aria is typing...</div>}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
