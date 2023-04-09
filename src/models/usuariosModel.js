import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  carrera: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
});

const Usuarios = mongoose.model('Usuarios', usuariosSchema);

export default Usuarios;
