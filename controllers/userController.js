const User = require ('../models/User');
const bcrypt = require ('bcryptjs');

// obtener todos los usarios
exports.getAllUser = async (req, res) => {
    console.log('[CONTROLLER] Ejecutando getAllUsers'); //diagnostico
    try{
        const users = await User.find().select('username email role createdAt updatedAt __v').populate('role', 'name');
        console.log('[CONTROLLER] Usarios enocntrados: ', users.length);
        res.status(200).json({
            success: true,
            data: users
        });
    }catch(error){
        console.error('[CONTROLLER] Error en getAllUsers: ', error.message);//Diagnostico
        res.status(500).json({
            success: false,
            message: 'Error al obtenert los usarios'
        });
    }
};

// Obtener usuario especifico
exports.getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Usario no encontrado'
            });
        }

        //validacion de acceso 
        if (req.userRole === 'auxiliar' && req.userId !== user.id.toString()){
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para ver este usuario'
            });
        }

        if (req.userRole === 'coordinador' && user.role === 'admin'){
            return res.status(403).json({
                success: false,
                message: 'No puedes ver usuarios admin'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario',
            error: error.message
        });
    }
};

// Crear usuario (admin) (coordinador)
exports.createUser = async (req, res) => {
    try{
        const{username, email, password, role}= req.body;
        const user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            user:{
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario',
            error:error.message
        });
    }
};

// Actualizar usuario (admin y coordinador)
exports.updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        ).select('-password');

        if (!updatedUser){
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            user: updatedUser
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

// Eliminar usuarios (solo Admin)
exports.deleteUser = async (req, res) => {
    console.log('[CONTROLLER] Ejecutando deleteUser para ID: ',req.params.id);//Diagnostico
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            console.log('[CONTROLLER] Usuario no encontrado para eliminar');//Diagnostico
            res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        console.log('[CONTROLLER] Usuario eliminado: ', deletedUser._id);//Diagnostico
        res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente'
        });
    }catch(error){
        console.error('[CONTROLLER] Error al eliminar usuario:', error.message);//Diagnostico
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
        });
    }
};