/* Routes of auth 
    http://localhost:8000/api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { login, register, verifyToken } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar.campos.js';
import { validarJWT } from '../middlewares/validar.jwt.js';

const authRoutes = Router()
authRoutes.post('/register',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio y debe ser valido').isEmail(),
        check('password', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').isLength({ min: 8 }),
        validarCampos
    ],
    register
);
authRoutes.post('/',
    [
        check('email', 'El email es obligatorio y debe ser valido').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({ min: 8 }),
        validarCampos
    ],
    login
);
authRoutes.get('/verifyToken', validarJWT, verifyToken);

export default authRoutes;