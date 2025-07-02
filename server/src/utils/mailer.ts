import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD
  }
});

/**
 * options: { to, subject, html, text }
 */
export function sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
  return transporter.sendMail({
    from: `${process.env.MAIL_ADDRESS}`,
    ...options
  });
}
