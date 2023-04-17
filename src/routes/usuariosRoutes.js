import express from 'express';
import * as usuariosController from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', usuariosController.registrarUsuario());
router.delete('/', usuariosController.eliminarUsuarios());
router.post('/login', usuariosController.login());

router.use(protect); // variable global de usuario
router.get('/me', getMe); // obtener usuario logueado
router.put('/', updateUser); // actualizar usuario logueado

router.use(verifyRole); // usar para sacar el rol
router.get('/', obtenerUsuarios);

export default router;
