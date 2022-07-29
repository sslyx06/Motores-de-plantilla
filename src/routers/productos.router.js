import { Router } from "express";
import Manager from "../Manager/contenedor.js"
import { uploader } from "../utils.js";
const manager  = new Manager();
const router = Router();

///GET '/productos' -> devuelve todos los productos.

router.get('/',async(req,res)=>{
    let productos = await manager.getAll()
    if (productos.length <= 0) {
        res.send("No hay productos")
    } else {
        let productos = await manager.getAll()
        res.render('mostrarTodo',{
            productos
        })
    }
})

//GET '/productos/:id' -> devuelve un producto según su id.

router.get('/id',async(req,res)=>{
    let Lista = await manager.getAll()
    if (req.query.id >Lista.length ||req.query.id<=0) {
        res.send("404 El valor pedido no existe")
    } else {
        let numero = req.query.id
        let producto = await manager.getById(numero)
        res.render('mostrarById',{
            producto
        })
    }

})

//POST '/productos' -> recibe y agrega un producto.

//router.post('/',async(req,res)=>{
  //  let producto = req.body
    //res.send({status:"succes", message:"Product Added"})
    //await manager.save(producto)
//})
//POST '/api/products'
router.post("/", uploader.single("image"), async (req, res) => {
    const { title, prices, thumbnail } = req.body;
    if (!req.file)
      return res
        .status(500)
        .send({ status: "error", error: "Couldn't upload file" });
    if (!title || !prices || !thumbnail)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    let product = {
      title,
      prices,
      thumbnail,
      image: req.file.filename,
    };
    await Manager.save(product);
    res.send({ status: "success", message: "Product created" });
  });

//PUT '/productos/:id' -> recibe y actualiza un producto según su id.

router.put('/',async(req,res)=>{
    let producto = req.body
   await manager.actualizar(producto)
})


//DELETE '/productos/:id' -> elimina un producto según su id.
router.delete('/',async(req,res)=>{
    let id = req.body
    res.send("Eliminado")
   await manager.deleteById(id.delete)
})





export default router;