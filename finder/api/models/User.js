const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 255,
    },
    lname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 2,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255,
    },
    /* birthdate: {
      type: Date,
      required: true,
      min: 8,
    }, */
    
    resetLink: {type: String, default: ""},//guarda el token de recupero de contraseña
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: "Release",
    }],
},
  { timestamps: true }
);

module.exports = model("User", userSchema);