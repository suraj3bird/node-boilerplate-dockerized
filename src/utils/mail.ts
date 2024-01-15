import nodemailer from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "../config";

const serviceOption = {
  service: "gmail",
  host: config.mail.host,
  port: Number(config.mail.port),
  auth: {
    user: config.mail.user,
    pass: config.mail.pass
  },
  debug: config.mail.debug,
  logger: config.app.isDev
};

const nodemailerOptions: SMTPTransport.Options = serviceOption;
const transport = nodemailer.createTransport(nodemailerOptions);

export const sendEmail = async (
  to: string[],
  subject: string,
  message: string
) => {
  try {
    const mailOptions = {
      from: config.mail.from,
      to: to.join(""),
      subject: subject,
      html: message
    };
    return transport.sendMail(mailOptions);
  } catch (err) {
    console.log("Mail not sent", err);
    return null;
  }
};

export interface IMailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
