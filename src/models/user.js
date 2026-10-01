import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function () {
  if (this.isNew && !this.username) {
    this.username = this.email;
  }
});

userSchema.method('toJSON', function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
});

export const User = mongoose.model('User', userSchema);
