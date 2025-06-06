const express = require ('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {verifySignUp} = require('../middlewares');

//Importacion de verificacion

let verifyToken;
try {
    const authJwt = require ('../middlewares/authJwt');
    verifyToken = authJwt.verifyToken;
    console.log ('[AuthRoutes] verifyToken importado correctamente', typeof verifyToken)
}catch (error){
    console.log('[AuthRoutes] ERROR al importar verifyToken: ',error)
    throw error;
};

//middlewares de diagnostico

router.use((req,res,next) =>{
    console.log('\n[AuthRoutes] Peticion recibida: ', {
        method: req.method,
        path: req.path,
        Headers: {
            authorization: req.headers.authorization ? '***': 'NO',
            'x-access-token': req.headers['x-access-token']?'***':'NO'
        }
    });
    next();
});

//Rutas de login (sin proteccion)
router.post('/signin', authController.signin);

//Rutas de registro
router.post('/signup',(req, res,next)=>{
    console.log('[AuthRoutes] Middleware de verificacion de registro');
    next();
},
verifySignUp.checkDuplicateUsernameOrEmail,
verifySignUp.checkRolesExisted,
authController.signup
);

//Verificacion final de rutas
console.log('[AuthRotes] Rutas configuradas: ', router.stack.map(layer =>{
    return{
        path:layer.route?.path,
        method:layer.route?.method
    };
}));

module.exports = router;