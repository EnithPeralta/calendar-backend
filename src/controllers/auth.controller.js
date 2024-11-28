import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generarJWT } from "../helpers/jwt.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validar email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crear y guardar el usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generar JWT
        const token = await generarJWT(newUser.id, newUser.name);

        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error); // Depuración del error
        res.status(500).json({
            ok: false,
            message: 'Error al registrar el usuario',
        });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        const confirmPassword = bcrypt.compareSync(password, user.password);

        if (!confirmPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(user.id, user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
}
export const verifyToken = async (req, res) => {

    const { uid, name } = req;
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}