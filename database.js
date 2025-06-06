const mogoose = require('mogoose');
const {DB_URI} = require('./config');

const connectDB = async () => {
    try{
        await mogoose.connect(DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('OK MongoDB conectado');
    }catch(error){
        console.error('X Error de conexion a MongoDB:'),error.message;
        process.exit(1);
    }
};

module.exports = connectDB;


