import Joi from 'joi';

export const usuariosSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  dni: Joi.number().min(8).required(),
  email: Joi.string().email().required(),
  telefono: Joi.number().min(9).required(),
  carrera: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.string().required(),
});
