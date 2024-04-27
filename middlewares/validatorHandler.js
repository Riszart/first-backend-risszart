const boom = require('@hapi/boom')

function validatorHandler(schema,property){   //middleware de froma dinamica - en propiedad de closures
  return (req,res,next)=>{
    const data = req[property]
    const {error} = schema.validate(data,{abortEarly:false})  // ,{abortEarly:false} === encontrara todos los errores y los mandara en grupo
    // sin eso lo que hara joi es mandar error por error que encuentre.
    if(error){
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
