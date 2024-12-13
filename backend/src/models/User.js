const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "El correo debe tener un formato válido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    maxlength: [16, "La contraseña no puede tener más de 16 caracteres"],
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*$\-#]).{8,16}$/.test(
          value
        );
      },
      message:
        "La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial (*, $, -, #)",
    },
  },
  firstName: {
    type: String,
    required: [true, "Los nombres son obligatorios"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Los apellidos son obligatorios"],
    trim: true,
  },
  idDocument: {
    type: String,
    required: [true, "El documento de identidad es obligatorio"],
    enum: ["Cédula de Ciudadanía", "Pasaporte", "Tarjeta de Identidad"],
  },
  idNumber: {
    type: String,
    required: [true, "El número de documento es obligatorio"],
    unique: true,
  },
  birthDate: {
    type: Date,
    required: [true, "La fecha de nacimiento es obligatoria"],
    validate: {
      validator: function (value) {
        const today = new Date();
        return value < today;
      },
      message: "La fecha de nacimiento debe ser anterior a hoy",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "El número de celular es obligatorio"],
    match: [/^\d{10}$/, "El número de celular debe tener 10 dígitos"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: [true, "El rol es obligatorio"],
  },
},{
  versionKey: false
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
