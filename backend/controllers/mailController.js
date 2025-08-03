const nodemailer = require('nodemailer');
const Mail = require('../models/Mail');

exports.sendBulkMail = async (req, res) => {
  const { subject, body, recipients } = req.body;

  if (!subject || !body || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: 'Subject, body, and a non-empty recipients array are required.' });
  }

  console.log('📥 Incoming email request:', { subject, body, recipients });
  console.log('📤 Sending from:', process.env.MAIL_USER);

  const mail = new Mail({ subject, body, recipients, status: 'pending' });
  await mail.save();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.MAIL_USER,
    to: recipients.join(','),
    subject,
    text: body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Mail sent:', info.response);

    mail.status = 'sent';
    await mail.save();
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('❌ Mail send error:', error.message);
    mail.status = 'failed';
    await mail.save();
    res.status(500).json({ error: 'Failed to send emails', details: error.message });
  }
};


exports.getHistory = async (req, res) => {
  const history = await Mail.find().sort({ createdAt: -1 });
  res.status(200).json(history);
};
