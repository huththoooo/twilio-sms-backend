const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: to,
    });

    res.json({ success: true, sid: sms.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));