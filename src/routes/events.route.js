/* Routes of auth 
    http://localhost:8000/api/events
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar.campos.js';
import { addEvent, deleteEvent, getEvent, updateEvent } from '../controllers/event.controller.js';
import { isDate } from '../helpers/isDate.js';
import { validarJWT } from '../middlewares/validar.jwt.js';

const eventRoutes = Router();

eventRoutes.use(validarJWT);

eventRoutes.get('/', getEvent);
eventRoutes.post('/create',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    addEvent
);
eventRoutes.put('/update/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    updateEvent
);
eventRoutes.delete('/delete/:id', deleteEvent)
export default eventRoutes;