const products = require("../data/products");
const { writeDataToFile} = require("../utils");

const {v4 : uuidv4} = require("uuid");

// @desc get All Products
// @route GET api/products  

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

// @desc get Specific Product
// @route GET api/products/:id  
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === id);
        resolve(product);
    })
}

// @desc Create Product
// @route POST api/products 
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    })
}



module.exports = {
    findAll,
    findById,
    create
}