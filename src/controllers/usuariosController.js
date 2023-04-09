import Usarios from '../models/usuariosModel.js';

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
    const usuario = new Usarios({
      nombre,
      apellido,
      dni,
      email,
      telefono,
      carrera,
      password,
      passwordConfirm,
    });
    const usuarioGuardado = await usuario.save();
    res.status(201).json(usuarioGuardado);
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
