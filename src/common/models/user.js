import mongoose from 'mongoose'
const mongooseHidden = require('mongoose-hidden')()

const opts = {
  timestamps: true
}

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      default: function () {
        return this._id
      },
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, hide: true },
    name: { type: String, required: true },
    verificationSentAt: { type: Date, default: Date.now, hide: true },
    verificationToken: { type: String, hide: true},
    resetPasswordToken: { type: String, hide: true },
    resetPasswordSentAt: { type: Date, hide: true },
    lastPasswordChangedAt: { type: Date, default: Date.now, hide: true },
    googleId: { type: String }
  },
  opts,
)

userSchema.index({email: 1})
userSchema.index({verificationToken: 1})
userSchema.index({resetPasswordToken: 1})

userSchema.plugin(mongooseHidden, { hidden: { _id: true } })

const User = mongoose.model('users', userSchema)

export default User