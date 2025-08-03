// src/components/SendMail.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function SendMail() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setStatus('');
    if (!subject || !body || !recipients) {
      setStatus('⚠️ Please fill in all fields.');
      return;
    }

    const emailList = recipients
      .split(',')
      .map(email => email.trim())
      .filter(email => email.includes('@'));

    if (emailList.length === 0) {
      setStatus('⚠️ Please enter valid email addresses.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/mail/send', {
        subject,
        body,
        recipients: emailList,
      });

      if (res.status === 200) {
        setStatus('✅ Email(s) sent successfully!');
        setSubject('');
        setBody('');
        setRecipients('');
      } else {
        setStatus('❌ Failed to send emails.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error. Check backend logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold text-center">📧 Send Bulk Mail</h1>

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Email Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 border rounded"
        rows={5}
      />

      <input
        type="text"
        placeholder="Recipients (comma-separated emails)"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>

      {status && <p className="text-center font-medium">{status}</p>}
    </div>
  );
}
