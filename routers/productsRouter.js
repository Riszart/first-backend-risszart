const express = require('express')
// const { faker } = require('@faker-js/faker') // ya no es nesesario porque se movio y esta en service solo importamos
const ProductsService = require('./../services/productsService')
const validatorHandler = require('./../middlewares/validatorHandler')
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/productSchema')

const router = express.Router()
const service = new ProductsService()

router.get('/',async (req,res)=>{
  // const products = []  // ya no es nesesario porque se le puso en service
  // const {size} = req.query
  // const limit = size || 10
  // for(let index = 0; index < limit; index++){
  //   products.push({
  //     name:faker.person.fullName(),
  //     price:parseInt(faker.commerce.price({
  //       min: 1000, max:3000, dec:0
  //     })),
  //     image:faker.image.url()
  //   })
  // }
  const products = await service.find()
  res.json(products)
})

router.get('/filter',(req,res)=>{
  res.end('yo soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} =req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  // const id =req.params.id
  // se creo otra manera de gestionar los errores
  // if(id==='999'){       // todos los parametros que se resiba por get asi sean un numero lo enviara como string
  //   res.status(404).json({
  //     message:'not found'
  //   })
  // }else{
  //   res.status(200).json ({
  //     id,
  //     name:'product 2',
  //     price:2000
  //   })
  // }

})

router.post('/',
validatorHandler(createProductSchema,'body'),
async (req,res)=>{
  const body = req.body
  const newProduct = await service.create(body)
    res.status(201).json(newProduct)
})

router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req,res)=>{
  try {
    const {id}=req.params
    const body = req.body
    const product = await service.update(id,body)
    res.json(product)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

  // res.json({         // se cambio por   res.json(product)
  //   message: 'update',
  //   data: body,
  //   id
  // })
})
router.delete('/:id',async (req,res)=>{
  const {id}=req.params
  const rta = await service.delete(id)
  res.json(rta)
  // res.json({
  //   message: 'deleted',
  //   id
  // })
})

module.exports = router
