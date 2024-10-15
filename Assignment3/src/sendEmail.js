// src/sendEmail.js
import axios from 'axios'

// 使用正确的 Mailgun API URL 和你的域名
const API_BASE_URL =
  'https://api.mailgun.net/v3/sandbox577397619675466b7c446c73bbcde81.mailgun.org/messages' 
const API_KEY = 'a06a57126389adf4e66a242dc72320fd-d010bdaf-d6e2ec77' 

// 发送邮件函数
export const sendEmail = async (recipientEmail, subject, htmlContent) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      new URLSearchParams({
        from: 'Mailgun Sandbox <postmaster@sandbox57739761967546b6b7c44c673bbcde81.mailgun.org>', 
        to: recipientEmail, // 收件人
        subject: subject, // 邮件主题
        html: htmlContent // 邮件内容
      }),
      {
        auth: {
          username: 'api',
          password: API_KEY 
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    console.log('Email sent successfully:', response.data)
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message)
  }
}
