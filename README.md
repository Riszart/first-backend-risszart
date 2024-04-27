# npm init -y
# crear .gitignore
  buscar en gitignore.io 
# crear .eslintrc.json
  insertar configuracion previa
# crear .editorconfig
  para que funcione debe tener la extencion editor config: rellenar el archivo con una configuracion previa.(formatea el aditor para que los miembros del quipos trabajen con una sola configuracion)
# npm i nodemon -D
# npm i eslint -D
  tener intalado la dependencia de eslint en vscode
# npm i eslint-config-prettier -D
# npm i eslint-plugin-prettier -D
# npm i prettier -D
# levantar entorno de desarrollo en package.json
    "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "lint": "eslint"
    },
# npm i  express


# RESfull API - representational state tranfer

# instalacion para crear datos falsos npm
npm install @faker-js/faker --save-dev

# el problema del filter que al poder product/filter lo toma como id se soluciona.
todo lo que es espesifico debe ir antes de lo dinamico

# middleware
Middleware es software que permite uno o más tipos de comunicación o conectividad entre dos o más aplicaciones o componentes de aplicaciones en una red distribuida. Al facilitar la conexión de aplicaciones que no fueron diseñadas para conectarse entre sí, y al brindar funcionalidad para conectarlas de manera inteligente, el middleware agiliza el desarrollo de aplicaciones y acelera el tiempo de comercialización.

casos de usos:
  funciona como pipes
  validar datos
  capturar errores
  validar permisos
  controlar accesos

tipos

 - middleware comun
function(req,res,next){
  if(something){
    res.send('end')
  }else{
    next()
  }
}

 - middleware tipo error
function(error,req,res,next){
  if(something){
    res.status(500).json({error})
  }else{
    next()
  }
}
# libreia boom ------ para gestionar los errores
  npm i @hapi/boom
# libreia para la validacion de datos
  npm i joi
# mas middleware    ----    https://expressjs.com/en/resources/middleware.html

# recomendaciones 
  - cors  -- documentacion en mdn
  - Https
  - Procesos de Build
  - Remover Logs
  - Seguridad (Helmet)
  - Testing

# cors  --  para controlar el accseso a la api
  npm i cors
