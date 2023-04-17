import Usuarios from '../models/usuariosModel.js';
import { toUpper } from '../utils/toUpper.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

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

    const todni = dni.toString();
    const totelefono = telefono.toString();

    // const { error } = usuariosSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ error: error.message });
    // }

    const user = { email };
    const accesstoken = generateAccessToken(user);
    if (totelefono.length == 9) {
      if (todni.length == 8) {
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
          res.status(404);
          res.json({
            message: 'No coinciden los password',
          });
        }
      } else {
        res.status(404);
        res.json({
          message: 'El dni debe tener 8 digitos',
        });
      }
    } else {
      res.status(404);
      res.json({
        message: 'El telefono debe tener 9 digitos',
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const useremail = await Usuarios.findOne({ email });
    if (!useremail) {
      res.status(404).json({
        message: 'incorrect email or does not exist',
      });
    }

    // match token
    const user = { email };

    const accesstoken = generateAccessToken(user);
    res.header('authorization', accesstoken);

    const userpasswordbcry = bcrypt.compareSync(password, useremail.password);
    if (!userpasswordbcry) {
      return res.status(404).json({
        message: 'incorrect password',
      });
    }
    res.status(201);
    res.json({
      status: 'success',
      message: `Welcome ${email}`,
      token: accesstoken,
    });
  } catch (error) {
    console.error('Login failed', error);
  }
};

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'No tienes autorizacion para acceder a este recurso',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await Usuarios.findOne({ email: req.user.email });
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { nombre, apellido, dni, email, telefono, carrera } = req.body;
    const todni = dni.toString();
    const totelefono = telefono.toString();

    if (totelefono.length == 9) {
      if (todni.length == 8) {
        const user = await Usuarios.findOneAndUpdate(
          { email: req.user.email },
          {
            nombre: toUpper(nombre),
            apellido: toUpper(apellido),
            dni,
            email,
            telefono,
            carrera: toUpper(carrera),
          },
          { new: true }
        );
        res.status(200).json({
          status: 'success',
          data: user,
        });
      } else {
        res.status(404);
        res.json({
          message: 'El dni debe tener 8 digitos',
        });
      }
    } else {
      res.status(404);
      res.json({
        message: 'El telefono debe tener 9 digitos',
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const verifyRole = async (req, res, next) => {
  const user = await Usuarios.findOne({ email: req.user.email });

  const role = user.role;

  console.log(role);

  if (role === 'admin') {
    next();
  } else {
    res.status(401).json({
      message: 'No tienes autorizacion para acceder a este recurso',
    });
  }
};
