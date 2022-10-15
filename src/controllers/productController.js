const productModel = require("../models/productModel")

const product = async (req, res) => {
    try {
        let productData = req.body
        let result = await productModel.create(productData)
        res.send(result)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

const getProduct = async (req, res) => {
    try {
        let products = await productModel.find({ isDeleted: false })
        if (product.length > 0) {
            return res.status(200).send({ status: true, data: products })
        } else {
            return res.status(404).send({ status: false, message: "No Product Found" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }

}


const deleteProduct = async (req, res) => {

    try {
        let productId = req.params.id

        let findProduct = await productModel.findById(productId)
        if (!findProduct) {
            return res.status(404).send({ status: false, message: "Product not found" })
        }

        if (findProduct.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Product alreaady deleted" })
        }

        await productModel.findByIdAndUpdate(
            productId,
            { $set: { isDeleted: true, deletedAt: new Date() } }
        )
        return res.status(200).send({ status: false, message: "Succes" })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const GetProductWithId = async (req,res) => {
    try {
        let ProductId = req.params.id
        let product = await productModel.findById(ProductId)
        if (product) {
            return res.status(200).send({status: true, data: product})  
        } else {
            return res.status(404).send({ status: false, message: "product not found" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const updateProduct = async(req,res)=>{
    try {
     let productId = req.params.id
     await productModel.findByIdAndUpdate(
        productId,
        {
            $set:req.body
        }
     )
     return res.status(200).send({status:true, message:"Success"})
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })  
    }
}
   
    const searchProduct = async(req,res)=>{
       try {
        let key = req.params.key
        const result = await productModel.find({
           $or:[
            {name:{$regex:key}},
            {price:{$regex:key}},
            {company:{$regex:key}},
            {name:{$regex:key}}
           ]
        })
            return res.status(200).send({status:false, data:result})
       } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
       }
       
    }   
   
module.exports = { product, getProduct, deleteProduct, GetProductWithId , updateProduct ,searchProduct}