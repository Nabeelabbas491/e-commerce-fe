const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const bcrypt = require("bcryptjs");
// const Joi = require("joi");

// const crypto = require("crypto");

// const { string, number } = require("joi");

/* user */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    //   required: true,
    },
    // password: {
    //   type: String,
    //   required: "Password is required",
    // },
    email: {
      type: String,
      trim: true,
      unique: true,
    //   required: true,
    },
    // phoneNumber: {
    //   type: Number,
    //   required: true
    // },
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
  },
  {
    timestamps: true,                 
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// userSchema.pre("save", async function (next) {         
//   // check the password if it is modified
//   if (!this.isModified("password")) {
//     return next(); 
//   }
//   // Hashing the password
//   this.password = await bcrypt.hash(this.password, 12);
//   // Delete passwordConfirm field
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = { User };