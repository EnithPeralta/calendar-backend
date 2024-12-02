import { Event } from "../models/event.js";

// Obtener eventos
export const getEvent = async (req, res) => {
    try {
        const events = await Event.find().populate('user', 'name');
        res.json({
            ok: true,
            events
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener eventos'
        });
    }
};

// Agregar un evento
export const addEvent = async (req, res) => {
    const { title, notes, start, end } = req.body;
    const user = req.uid;
    try {
        const newEvent = new Event({
            title,
            notes,
            start,
            end,
            user
        });

        const eventoGuardado = await newEvent.save();
        res.json({
            ok: true,
            event: eventoGuardado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear evento',
            error: error.message 
        });
    }
};

// Actualizar un evento
export const updateEvent = async (req, res) => {
    const { title, notes, start, end } = req.body;
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }
        const updatedEvent = {
            title,
            notes,
            start,
            end,
            user: uid
        };
        const eventoActualizado = await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true });
        res.json({
            ok: true,
            event: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evento',
            error: error.message 
        });
    }
};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento'
            });
        }
        await Event.findByIdAndDelete(eventId);
        res.json({ ok: true });
    } catch (error) {
        console.log(error );
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar evento',
            error: error.message 
        });
    }
}