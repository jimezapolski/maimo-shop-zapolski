//los models son los modelos de las collections 
import mongoose from "mongoose";
const Schema = mongoose.Schema; // schema = equema de 

const orderSchema = new Schema({
    total: {type:Number},
    products: {type: Array},
    clientID: { type: String},
    timestamps: true,
})

export default mongoose.model("Order", orderSchema, "Orders"); // 1er parametro - de la forma que quiero que se llame, 2do - const del producto, 3ero - como se llama en mongodb mi coleccion

