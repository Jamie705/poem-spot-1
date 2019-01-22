const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: "Email is Required",
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function (input) {
        return input.length >= 6;
      },
      "Password should be longer minimum length is 6."
    ]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  //associate poem with user
  poem: {
    type: Schema.Types.ObjectId,
    ref: "Poem"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
