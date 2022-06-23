const verifyEmail = async (user) => {
  user.verified = true
  user.verificationToken = null
  await user.save()
  return user
}

export { verifyEmail }
