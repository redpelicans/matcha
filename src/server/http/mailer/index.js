import nodemailer from 'nodemailer';
import { secretPasswordMail } from '../../../../etc/secret';

const mailer = (secret, who, sub, message) => {
  const info = {
    to: who,
    subject: sub,
    text: message,
  };
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'apimatcha42@gmail.com',
      pass: secret,
    },
  });
  transport.sendMail(info);
  transport.close();
};

export default mailer;
