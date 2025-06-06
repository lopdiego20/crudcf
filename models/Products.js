const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'El nombre es obligatirio'],
        trim: true,
        unique:true
    },
    description: {
        type: String,
        required :[true, 'La descripcion es obligatoria'],
        trim: true
    },
    price: {
        type: Number,
        required:[true, 'El precio es oblogatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
        type: Number,
        required:[true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo']
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoria es obligatoria']
    },
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: [true, 'La subcategoria es obligatoria']
    },
    images: [{
        type: String,
    }]
}, {
    timestamps: true,
    versionKey: false 
});

//Manejo de error de duplicados
productSchema.post('save', function(error, doc, next){
    if (error.name === 'MongoError' && error.code === 11000){
        next(new Error ('Ya existe un producto con ese nombre '));
    }else {
        next(error);
    }
});

    module.exports = mongoose.model('Product', productSchema);