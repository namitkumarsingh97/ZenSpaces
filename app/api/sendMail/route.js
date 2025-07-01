import nodemailer from 'nodemailer';

export async function POST(req) {
  const body = await req.json();
  const { to = '', subject = '', text = '', phone = '', firstname = '', lastname = '', transactionId = '' } = body;

  const recipient = to || 'no-reply@example.com';
  const emailSubject = subject || 'No Subject';
  const emailBody = text || 'No message provided.';
  const phoneNumber = phone || 'No phone number provided.';
  const firstName = firstname || 'No first name provided.';
  const lastName = lastname || 'No last name provided.';
  const transId = transactionId || 'No transaction ID provided.';

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "raman12106@gmail.com",
      pass: "qhbeozoppsqxxett"
    },
  });
  
  const mailOptions = {
    from: recipient,
    to: "astrovasturaman@gmail.com", 
    subject: emailSubject,       
    text: `${emailBody}\n\nPhone Number: ${phoneNumber}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail Id: ${recipient}\nTransaction ID: ${transId}`, // email body with additional info
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully', info }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
