const { conexion } = require("./BaseDeDatos/conexion.js");

const express = require("express");
const cors = require("cors");
const article = require("./Modelos/Article.js");
const bd = require("mongoose");

//inicializando mi APP
console.log("Mi API Rest arrancada");

//Inicializar la base de datos
conexion();

//Crear un Servidor Node

const app = express();
const puerto = 3900;



//Configurar los CORS
app.use(cors());


//Convertir body a objeto js

app.use(express.json());

//Escuchar las peticiones del puerto
app.listen(puerto, () => {

    console.log("Servidor corriendo en el puerto: " +puerto);
})

//Crear rutas
app.get("/probando", (req,res) =>{
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).send(`
        <div>
        <h1>Probando nuestra ruta en NodeJS</h1>
        <p>Creando API res con NODE</p>
        </div>
    `);
})

// Crear
app.post("/create", async (req, res) => {
    try {
        const articleNew = new article(req.body);
        const articleSave = await articleNew.save();
        res.status(201).json(articleSave);
    } catch (error) {
        res.status(500).json({ message: "No se pudo crear un nuevo articulo." });
    }
});

// Leer
app.get("/read", async (req, res) => {
    try {
        const articles = await article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "No se pudo recuperar los articulos" });
    }
});

// Actualizar
app.put("/update/:id", async (req, res) => {
    try {
        const articleUpdating = await article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(articleUpdating);
    } catch (error) {
        res.status(500).json({ message: "Error al modificar el item." });
   }
});

// Eliminar
app.delete("/delete/:id", async (req, res) => {
    try {
        await article.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Artículo eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el item." });
    }
});