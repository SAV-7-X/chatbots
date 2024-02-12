import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginBox from './LoginBox';

import Chatbot from './Chatbot';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LoginBox/>} />
          <Route path="/Aria" element={<Chatbot></Chatbot>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
