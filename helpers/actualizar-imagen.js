const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

//leer las carpetas y archivos
const fs = require('fs');

const borrarImagen = ( path ) => {
    
    if( fs.existsSync( path )){
        //borrar la imagen anterior si existe duplicado
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ){
                console.log("no es un medico por id")
                return false;
            }
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            //reasignamos el nombre y guardamos
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if( !hospital ){
                console.log("no es un hospital por id")
                return false;
            }
            
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            //reasignamos el nombre y guardamos
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if( !usuario ){
                console.log("no es un usuario por id")
                return false;
            }
            
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            //reasignamos el nombre y guardamos
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break; 
    }
}

module.exports= {
    actualizarImagen
}