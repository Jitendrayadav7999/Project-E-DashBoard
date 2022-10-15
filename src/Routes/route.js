const express = require("express")
const router = express.Router()
const useController = require("../controllers/userController")
const productController = require("../controllers/productController")
const {authentication} = require("../middlewers/auth")

router.get("/test-me",function(req,res){
    res.send({status:true, message:"all done"})
})

router.post("/signup",useController.createUser)

router.post("/login",useController.login)

router.post("/add-product", productController.product)

router.get("/get-product", authentication, productController.getProduct)

router.delete("/delete-product/:id", productController.deleteProduct)

router.get("/product/:id", productController.GetProductWithId)

router.put("/product/:id", productController.updateProduct)

router.get("/products/:key",productController.searchProduct)



module.exports = router