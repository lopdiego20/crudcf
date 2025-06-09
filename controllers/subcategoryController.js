const Subcategory = require('../models/Subcategory');
const Category = require('../models/category');

// Crear subcategoria
exports.createSubcategory = async (req, res) => {
    try {
        const {name, description, category} = req.body;
        //Validar que la categoria exista
        const parentCategory = await Category.findById(category);
        if(!parentCategory){
            return res.status(400).json({
                success: false,
                message: 'La categoria no existe'
            });
        }
        const newSubcategory = new Subcategory({
            name: name.trim(),
            description: description.trim(),
            category
        });

        await newSubcategory.save();
        res.status(201).json({
            success: true,
            message:'Subcategoria creada existosamente',
            data: newSubcategory
        });
    }catch (error){
        console.error('Error al crear la Subcategoria', error);

        if (error.message.includes('duplicate key') || error.message.includes('Ya exixte')){
            return res.status(400).json({
                success: false,
                message:'Ya exixte una subcategoria con ese nombre'
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Error al crear Subcategoria'
        });
    }
};


//Obtener todas las Subcategoria
exports.getSubcategories = async (req, res) =>{
    try{
        const subcategoria = await Subcategory.find()
        .populate('category','name');
        res.status(200).json({
            success: true,
            data: Subcategoria
        });
    }catch(error){
        console.error('Error al obtener la subcategoria: ', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la subcategoria'
        }); 
    }
};
//obtener subcategoria pr id
exports.getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id).populate('category','name');
        if(!subcategory){
            return res.status(404).json({
                success: false,
                message: 'Subcategoria no encontrada'
            });
            }
            res.status(200).json({
                success:true,
                data: subcategory
            });
    }catch (error){
        console.error('Error al obtener la subcategoria: ', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la subcategoria'
        });
    }
};

//Actualizar subcategoria
exports.updateSubcategory = async (req, res) => {
    try {
        const {name, description, category} = req.body;

        //Verificar si se cambia la categoria
        if(category){
            const parentCategory = await Category.findById(category);
            if(!parentCategory){
                res.status(404).json({
                    success: false,
                    message: 'La categoria no existe'
                });
            }
        }
        
        const updateSubcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            {
                name: name? name.trim(): undefined,
                description: description? description.trim(): undefined,
                category
            },
            {new: true, runValidators: true}
        );
        if(!updateSubcategory){
            return res.status(404).json({
                success: false,
                message: 'Subcategoria no encontrada'
            });
    }

    res.status(200).json({
        success: true,
        message: 'Subcategoria actualizada',
        data: updateSubcategory
    });
}catch(error){
    console.error('Error al actualizar la subcategoria: ', error);
    res.status(500).json({
        success: false,
        message: 'Error al actualizar la subcategoria'
       });
    }
};

//Eliminar subcategoria
exports.deleteSubcategory = async (req, res) => {
    try{
        const deteledSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if(!deteledSubcategory){
            return res.status(404).json({
                success: false,
                message: 'Subcategoria no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Subcategoria eliminada'
        });
    }catch(error){
        console.error('Error al eliminar la subcategoria: ',error );
        res.status(500).json({
            success:false,
            message: 'Error al eliminar subcategoria'
        });
    }
};

