const http = require("http");
const products = require("./data/products.json");
const { getProducts, getProduct, createProduct } = require("./controllers/productControllers");
const server = http.createServer(( req,res ) => {
      if(req.url === "/api/products" && req.method === "GET"){
         getProducts(req,res);
      }
      else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET"){
          const id = req.url.split("/")[3];
        
          getProduct(req,res,id);
      }
      else if(req.url === '/api/products' && req.method === 'POST'){
        createProduct(req,res);
      }
      else{
        res.writeHead( 404 , { 'Content-Type' : 'application/json'});
        res.write(JSON.stringify({ message: 'No Route Found' }));
        res.end();
      }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT);