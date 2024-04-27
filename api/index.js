// si se marca con amarillo o rojo como si ubiera error eso significa que esta a siendo su trabajo el eslint
// hace que el codigo no tenga errores para produccion
const express = require('express')
const cors = require('cors')
const routerApi = require('./routers')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler')   // los middleware de tipo error se deben hacer despues del router

const app = express()
const port = process.env.PORT || 3000 // para vercel debemos colocar la variable de ambiente

app.use(express.json())  // middleware se usa para poder enviar informacion en formato json

const whitelist=['https://localhost:8080','https://otra.app'] // las url que tendran acceso a la api  --(2)
const options = {                     //  controlara a que url data acceso a la api --(3)
  origin:(origin,callback)=>{
    if(whitelist.includes(origin) || origin){
      callback(null,true)
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors()) //  si solo se pone esto se dara permiso a la app a todos --(1)

app.get('/api',(req,res)=>{
  res.send('hola mi server en express')
})

app.get('/api/nueva-ruta',(req,res)=>{
  res.send('hola, soy nueva ruta')  //enviamos un string al frontend
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

//---------------------------------------------product---------------------- productsRouter.js
// app.get('/products',(req,res)=>{
//   const products = []
//   const {size} = req.query
//   const limit = size || 10
//   for(let index = 0; index < limit; index++){
//     products.push({
//       name:faker.person.fullName(),
//       price:parseInt(faker.commerce.price({
//         min: 1000, max:3000, dec:0
//       })),
//       image:faker.image.url()
//     })
//   }
//   res.json(products)
// })

// app.get('/products/filter',(req,res)=>{
//   res.end('yo soy un filter')
// })

// app.get('/products/:id', (req,res)=>{
//   // const id =req.params.id
//   const {id} =req.params
//   res.json ({
//     id,
//     name:'product 2',
//     price:2000
//   })
// })
//---------------------------------------------product----------------------

// app.get('/categories/:categoryId/products/:productId',(req,res)=>{
//   const {categoryId,productId}= req.params
//   res.json({
//     categoryId,
//     productId
//   })
// })
// //http://localhost:3000/categories/12/products/25

// app.get('/users',(req,res)=>{
//   const {limit,offset} = req.query
//   if(limit && offset){
//     res.json({
//       limit,
//       offset
//     })
//   }else{
//     res.send('no hay parametros')
//   }
// })
// //http://localhost:3000/users?limit=10&offset=200

app.listen(port,()=>{
  console.log('mi port '+port)
})
