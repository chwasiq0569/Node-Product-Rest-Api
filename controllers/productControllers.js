const Products = require("../models/productModels");

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
   const product = await Products.findById(id);
   if(!product){
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: 'No Route Found' }));
    res.end();
   }
   else{
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(product));
    res.end();
   }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {

  let body = '';
  req.on('data', (chunk) => {
       body+=chunk.toString();
  })
  
  req.on('end',async () => {

    const {name,description,price} = JSON.parse(body);

    const product = {
      name,
      description,
      price
    };

    const newProduct = await Products.create(product);
  
    res.writeHead(201, { "Content-Type": "application/json" });
  
    return res.end(JSON.stringify(newProduct));

  })



  } catch (error) {

    console.log(error);

  }
}
module.exports = {
  getProducts,
  getProduct,
  createProduct
};
