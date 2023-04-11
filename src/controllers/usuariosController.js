import Usarios from '../models/usuariosModel.js';
import { toUpper } from '../utils/toUpper.js';

export const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      email,
      telefono,
      carrera,
      password,
      passwordConfirm,
    } = req.body;

    if (password == passwordConfirm) {
      const usuario = new Usarios({
        nombre: toUpper(nombre),
        apellido: toUpper(apellido),
        dni,
        email,
        telefono,
        carrera: toUpper(carrera),
        password,
        passwordConfirm,
      });
      const usuarioGuardado = await usuario.save();
      res.status(201);
      res.json({
        message: 'Usuario creado correctamente',
        data: usuarioGuardado.nombre,
      });
    } else {
      res.json({
        message: 'no coinciden los password',
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usarios.find();
    res.status(200).json({
      status: 'success',
      count: usuarios.length,
      data: usuarios,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
