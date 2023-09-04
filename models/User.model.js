const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    userName: {
    type: String,
    required: [true, 'Email is required.'],
    },
    userSurname: {
    type: String,
    required: [true, 'Email is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1693817717/fotos-de-perfiles/blank-profile-picture-973460_960_720_1_erjnkk.webp"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
