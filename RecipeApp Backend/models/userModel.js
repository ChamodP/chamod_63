const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeseries: true }
);

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  userName,
  password
) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password not strong enough");
//   }

  const exists = await this.findOne({ userName });

  if (exists) {
    throw Error("user name already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const User = await this.create({
    firstName,
    lastName,
    userName,
    password: hash,
  });
  return User;
};

// static login method
userSchema.statics.login = async function(userName, password) {

    if (!userName || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ userName })
    if (!user) {
      throw Error('Incorrect userName, no user found')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

module.exports = mongoose.model("user", userSchema);
