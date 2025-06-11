const Category = require ('../models/category')

exports.createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;

        //validacion
        if (!name || typeof name !== 'string' || !name.
            trim()){
                return res.status(400).json({
                    success: false, 
                    message: 'El nombre es obligatorio o debe ser texto valido'
                }); 
            }
        if (!description || typeof description !== 'string' || !description.trim()){
            return res.status(400).json({
                success: false,
                message: 'La descripcion es obligatoria o debe ser texto valido'
            });
        }
        
        const trimmedName = name.trim();
        const trimmedDesc = description.trim();

        //Verificar si ya existe la categoria 
        const existingCategory = await Category.findOne({name: trimmedName});
        if (existingCategory){
        return res.status(400).json({
            success: false,
            message: 'Ya exixte una categoria con ese nombre'
        });


    }
    const newCategory = new Category ({
        name: trimmedName,
        description: trimmedDesc,
    
    });

    await newCategory.save();

    res.status(201).json({
        success: true,
        message: 'Categoria creada exitosamente',
        data: newCategory
    });
} catch (error){
    console.error ('Error al crear la createCategoty', error);

    //Manejo explicito de error 
    if (error.code == 11000){
        return res.status(400).json({
            success:false,
            message:'Ya exixte una categoria con ese nombre'
        });
    }
    res.status(500).json({
        success: false,
        message: 'Error al crear categoria',
        error: error.message
    });
    }
};

exports.getCategories = async (req, res) => {
    try {
        
        const categories = await Category.find().sort({createdAt:-1});
        res.status(200).json({
            success: true,
            data: categories,
        });
    }catch (error){
        console.error('Error en getCategories: ', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener categorias'
        });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category){
            return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            data: category
        });
    }catch (error){
        console.error('Error en getCategoryById', error)
        res.status(500).json({
            success: false,
            message: 'Error al obtener categoria'
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const {name, description} = req.body;
        const updateData= {};

        if (name){
            updateData.name = name.trim();
            // verificar si el nuevo ya exixte
            const existing = await Category.findOne({
                name: updateData.name,
                _id: {$ne: req.params.id}
            });
            if (existing){
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe una categoria con ese nombre'
                });
            }
        }
        if (description){
            updateData.description = description.trim();
        }
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true, runValidators: true}
        );
        if (!updateCategory){
            return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Categoria Actualizada',
            data: updateCategory
        });
    }catch (error){
        console.error ('Error en updateCategory: ', error);
        res.status(500).json({
            success:false,
            message: 'Error al actuañizar categoria'
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try{
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        if(!deleteCategory){
            return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Categoria eliminada'
        });
    }catch(error){
        console.error('Error en deleteCategory: ', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar categoria'
        });
    }
};