
module.exports = {
    //1. configuracion de JTW 
    SECRET: process.env.JWT_SECRET || 'Tu_clave_secreta_para_desarrollo',
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '24h',

    //2. configuracion de base de datos
    DB:{
        URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/crudcf',
        OPTIONS: {
            useNewUrlParser: true,
            useUnifiedTopology:true
        }
    },

    //3. roles del sistema (deben coincidir con tu implementacion)
    ROLES: {
        ADMIN: 'admin',
        COORDINADOR: 'coordinador',
        AUXILIAR: 'auxiliar'
    }
};
