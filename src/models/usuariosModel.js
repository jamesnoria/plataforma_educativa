import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nombre: {
    type: String,
    minLength: [2, 'el nombre debe de tener como minimo 2 caracteres'],
    maxLength: [25, 'el nombre debe de tener como maximo 25 caracteres'],
    match: [/^[a-zA-Z ]+$/, 'el nombre debe tener solo letras'],
    required: true,
  },
  apellido: {
    type: String,
    minLength: [2, 'el apellido debe de tener como minimo 2 caracteres'],
    maxLength: [25, 'el apellido debe de tener como maximo 25 caracteres'],
    match: [/^[a-zA-Z ]+$/, 'el apellido debe tener solo letras'],
    required: true,
  },
  dni: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'el email debe ser: ejemplo@email.com'],
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  carrera: {
    type: String,
    minLength: [5, 'la carrera debe tener como minimo 5 caracteres'],
    maxLength: [25, 'el apellido debe de tener como maximo 25 caracteres'],
    match: [/^[a-zA-Z ]+$/, 'la carrera debe tener solo letras'],
    required: true,
  },
  password: {
    type: String,
    minLength: [4, 'debe tener como minimo 4 caracteres'],
    required: true,
  },
  passwordConfirm: {
    type: String,
    minLength: [4, 'debe tener como minimo 4 caracteres'],
    required: true,
  },
});

usuariosSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const Usuarios = mongoose.model('Usuarios', usuariosSchema);

export default Usuarios;
