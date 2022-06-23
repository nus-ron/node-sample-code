import pug from 'pug'
import path from 'path'
import sgMail from '@sendgrid/mail'

export default async ({ template, emailData, emailAddress, subject }) => {
  let templatePath

  if (process.env.NODE_ENV === 'development') {
    templatePath = path.resolve('src', template)
  } else {
    templatePath = path.resolve('dist', template)
  }

  const compileTemplate = pug.compileFile(templatePath)

  const html = compileTemplate(emailData)

  const mail = {
    to: emailAddress,
    from: process.env.MAIL_FROM,
    subject: subject,
    html: html,
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  try {
    await sgMail.send(mail)
  } catch (error) {
    console.log(error)
  }
}
