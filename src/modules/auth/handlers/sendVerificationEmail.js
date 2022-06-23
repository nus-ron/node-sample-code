import mailService from '@common/mailService'

export default async (user) => {
  let emailData = {
    name: user.name,
    emailAddress: user.email,
    link: `${process.env.ROOT_URL}/users/verify?token=${user.verificationToken}`,
  }

  await mailService({
    template: 'modules/auth/views/verificationEmail.html.pug',
    emailData,
    emailAddress: user.email,
    subject: 'Verify your email address',
  })
}
