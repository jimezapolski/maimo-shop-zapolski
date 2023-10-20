//los models son los modelos de las collections 
import mongoose from "mongoose";
const Schema = mongoose.Schema; // schema = equema de 

const productSchema = new Schema({
    name: {type:String}
})

export default mongoose.model("Product", productSchema, "Products"); // 1er parametro - de la forma que quiero que se llame, 2do - const del producto, 3ero - como se llama en mongodb mi coleccion