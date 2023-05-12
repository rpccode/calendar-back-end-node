const { response } = require('express')
const Evento = require('../models/eventsSchema')

const getEvents = async (req, res = response) => {

    try {
        const eventos = await Evento.find({ user: req.uid }).populate('user', 'name')
        res.json({
            ok: true,
            eventos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar en la base de datos, Contacte con el administrador'
        })
    }

}


const createEvents = async (req, res = response) => {
    const evento = new Evento(req.body)
    try {

        evento.user = req.uid;
        const eventoDB = await evento.save()

        res.json({
            ok: true,
            eventoDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar en la base de datos, Contacte con el administrador'
        })
    }


}




const updateEvents = async (req, res = response) => {
    const eventoID = req.params.id
    // console.log(eventoID)
    try {
        const evento = await Evento.findById(eventoID)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe  con ese ID'
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene Privilegios para Editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }


        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento, { new: true })

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar en la base de datos, Contacte con el administrador'
        })
    }


}



const deleteEvents = async (req, res = response) => {
    const eventoID = req.params.id
    // console.log(eventoID)
    try {
        const evento = await Evento.findById(eventoID)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe  con ese ID'
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene Privilegios para Eliminar este evento'
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoID, { new: true })

        res.json({
            ok: true,
            evento: eventoEliminado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar en la base de datos, Contacte con el administrador'
        })
    }

}





module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}