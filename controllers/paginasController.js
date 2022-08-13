import { Viaje } from "../models/Viaje.js";
import { Testimoniales } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => { // req - lo que enviamos | resp - lo que express nos responde
    // Consultar 3 viajes de la DB
    // consultamos multiples consultas que no depende una de la otra al mismo
    // tiempo para que se ejecuten más rápido
    const consultaDB = [ ];

    consultaDB.push(Viaje.findAll({limit: 3}));
    consultaDB.push(Testimoniales.findAll({limit: 3}));

    try {
        const resultado = await Promise.all(consultaDB);

        res.render('inicio', {
            pagina: 'Inicio',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros =  (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros',
        clase: 'home'
    });
};

const paginaViajes = async (req, res) => {
    // Consultar la DB
    const viajes = await Viaje.findAll( );

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
};

const paginaTestimoniales = async (req, res) => {
   
    try {
        const testimoniales = await Testimoniales.findAll( );

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
};

//Muestra un viaje por su slug
const paginaDetallesViaje = async (req, res) => {

    const { slug } = req.params;

    try {
        const resultado = await Viaje.findOne({ where:  { slug } })

        res.render('viaje', {
            pagina: 'Información Viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetallesViaje
}