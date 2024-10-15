import express from 'express';
import cors from 'cors';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import bodyParser from 'body-parser';
import process from 'process';



const DOMAIN = 'sandbox57739761967546b6b7c44c673bbcde81.mailgun.org';
const mailgun = new Mailgun(formData);
const mgClient = mailgun.client({
  username: 'api',
  key: 'a06a57126389adf4e66a242dc72320fd-d010bdaf-d6e2ec77', 
});

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// 测试 API
app.get('/', (req, res) => {
  res.send('Hello from the email server!');
});

// 邮件发送 API
app.post('/email/login', async (req, res) => {
  const toEmail = req.body.recipientEmail;

  if (!toEmail) {
    return res.status(400).send('Recipient email is required.');
  }

  const emailData = {
    from: 'Mailgun Sandbox <postmaster@sandbox57739761967546b6b7c44c673bbcde81.mailgun.org>',
    to: toEmail,
    subject: 'Welcome!',
    text: 'Welcome back to our service!',
  };

  try {
    const result = await mgClient.messages.create(DOMAIN, emailData);
    console.log(result);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
