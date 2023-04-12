import Usuarios from '../models/usuariosModel.js';
import { toUpper } from '../utils/toUpper.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { usuariosSchema } from '../models/usuariosValidation.js';

dotenv.config({
  path: './.env',
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET);
};

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

    const { error } = usuariosSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // console.log(req.body);

    const user = { email };
    const accesstoken = generateAccessToken(user);
    if (password == passwordConfirm) {
      const usuario = new Usuarios({
        nombre: toUpper(nombre),
        apellido: toUpper(apellido),
        dni,
        email,
        telefono,
        carrera: toUpper(carrera),
        password,
        passwordConfirm,
      });

      await usuario.save();

      res.header('authorization', accesstoken);
      res.status(201);
      res.json({
        status: 'success',
        message: 'Usuario creado correctamente',
        token: accesstoken,
        data: [
          {
            nombre,
            apellido,
            carrera,
          },
        ],
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
    const usuarios = await Usuarios.find();
    res.status(200).json({
      status: 'success',
      count: usuarios.length,
      data: usuarios,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const eliminarUsuarios = async (req, res) => {
  const { nombre } = req.body;
  try {
    await Usuarios.deleteOne({ nombre: nombre });
    res.json({
      status: 'success',
      message: 'usuario eliminado',
    });
  } catch (error) {
    console.error('Error en la funcion eliminarUsuarios', error);
  }
};
