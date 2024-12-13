const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res, User) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    idDocument,
    idNumber,
    birthDate,
    phoneNumber,
    role = user,
  } = req.body;

  console.log("Datos recibidos en el backend:", req.body);

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  try {
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      idDocument,
      idNumber,
      birthDate,
      phoneNumber,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    if (err.code === 11000) {
      // Error de clave duplicada (E11000)
      const duplicateField = Object.keys(err.keyValue).join(", "); // Campo(s) duplicado(s)
      return res
        .status(400)
        .json({ message: `El ${duplicateField} ya está registrado` });
    }
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: err.message });
  }
};

// Inicio de sesión
const loginUser = async (req, res, User) => {
  // console.log('Solicitud de inicio de sesión recibida:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Incluir rol en el token
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: err.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res, User) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
