// src/components/MailHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MailHistory() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/mail/history')
      .then(res => setMails(res.data))
      .catch(() => console.log('Failed to fetch mail history'));
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mail History</h2>
      {mails.length === 0 ? <p>No emails sent yet.</p> : (
        <ul className="space-y-2">
          {mails.map((mail, i) => (
            <li key={i} className="border p-2 rounded">
              <p><strong>Subject:</strong> {mail.subject}</p>
              <p><strong>Body:</strong> {mail.body}</p>
              <p><strong>Recipients:</strong> {mail.recipients.join(', ')}</p>
              <p><strong>Status:</strong> {mail.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
