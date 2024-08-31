const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");
const conexion = async() => {
    try {
       await mongoose.connect("mongodb://localhost:27017/Mi_blog");
        console.log("Conectado correctamente a la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido establecer la conexion con la base de datos");
    }
}

module.exports ={
    conexion
}