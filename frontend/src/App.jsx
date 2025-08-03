import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SendMail from './components/SendMail';
import MailHistory from './components/MailHistory';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SendMail />} />
        <Route path="/history" element={<MailHistory />} />
      </Routes>
    </Router>
  );
}
