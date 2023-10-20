import express from 'express';
import Product from '../models/products.js'
const router = express.Router();

//find all
const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id name")
        return res.status(200).send({message: 'All products', products});
    } catch (error) {
        return res.status(501).send({message: 'Error', error});
    }
};

//find one
const findOneProduct = async (req, res) => {
  const { id } = req.params; // obtenemos el id 
  try {
    const product = await Product.findOne({ _id: id}).select("_id name"); // quiero que el _id(que es como se escribe en mongo) sea igual al id que quiero de ese producto
    return res.status(200).send({message: 'Product info', product});
  } catch (error) {
    return res.status(501).send({message: 'Error', error});
  }
};

//add product
const addProduct = async (req, res) => {
  try {
    const { name } = req.body;
  const product = new Product({name}); // agrego algo del tipo de mi modelo y como name y name son lo mismo puedo escribir una vez sol
  await product.save(); // con esto grabo en mi base de datos el producto
  
  return res.status(200).send({ message: `Product Created ${name}`, product });
  } catch (error) {
    return res.status(501).send({message: 'Error', error});
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const{id} = req.params;
    const {name} = req.body;

    const prooductToUpdate = Product.findOne({_id:id});

    if(!prooductToUpdate){
      return res.status(501).send({ message: 'Error Product not found' });
    }

    prooductToUpdate.name = name; // esto es una mutacion porque estamos pisanado lo que tiene product.name por name
    await prooductToUpdate.save(); //esto lo actualiza

   return res.status(200).send({ message: 'Product Updated', product: prooductToUpdate });
  } catch (error) {
    
  }
 
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const productToDelete = await Product.findOne({_id:id}); //me busca ese producto
    if(!productToDelete){
      return res.status(501).send({ message: 'Error Product not found' });
    }

    await Product.deleteOne({_id: id}); //aca ya sabemos que existe entonces lo eliminamos en product
    
    return res.status(200).send({ message: 'Product deleted', product: productToDelete });
  } catch (error) {
    return res.status(501).send({message: 'Error', error});
  }
  
};

//CRUD (Create, Read, Update, Delete)
router.get('/', findAllProducts);
router.get('/:id', findOneProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;