# Meetups Flink REST API

Esta Api esta creada con Node.js , express, cors, body-parce, mongoose, nodemon, dotenv y para la bade de datos utlice MongoDB NoSql por el motivo que no los modelos que use, no era necesario tantas relaciones por lo cual una NoSql quedaria perfecto.

Para ponder usar el Api de manera local tenemos que clonar el repositorio, ir a la terminal en donde se clono y poner el comdando *npm i* para que istale todas las dependecias que se utilzaron, despues *npm start*

~~~~
npm i

npm start
~~~~


En *app.js* es nustro servidor, vamos a imporar todas nuestra depencias para que podamos usar los diferente endPoit y conectarnos a la base de datos,

~~~~javascript
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./controllers/user');
const eventRoutes = require('./controllers/events');
const placeRoutes = require('./controllers/place');
const PORT = process.env.PORT || 4000
require('dotenv/config');
~~~~

Tambien es necesario crear un archivo .env en donde vamos a tener algunas variables de entorno , por ejemplo el usuario y contraseña de la basde de datos y nuesto JTK_KEY.

Lo primero que haremos es decirle nuestra app que va a utlizar **bodyParser** para que exprees pueda leer las respuestas del srvidoe en formato json,  **cors** para poder utilizar metodos HTTP.
Le diremos que antes de acceder a las rutas de usuario tendra que ir siempre la ruta */user*, antes de las rutas de eventos */event* y antes de la ruta de lugares */place*. (Es decir, antes de acceder a las rutas para poder crear, borrar, consultar cualquiera de estos datos tiene que ir estas rutas pricipales).
Ejemplo si quiera crear un usuario seria **"localhost:5000/user/createUser/"**

~~~~javascript
app.use(bodyParser.json());
app.use(cors()); 
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/place', placeRoutes);
~~~~

Tenemos un endPoit para el home, simplemente espara consultar que este bien todo, la respuesta que nos madara sera un **Home**

~~~~javascript
app.get('/', (req, res) =>{
    res.send('Home');
});
~~~~

Para podamos almacenar los datos en nuestra Base de datos necesitamos hacer la coneccion a esta y por utlimo decirle en que puerto estaremos trabajando

~~~~javascript
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('All rigth to conecto DB');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
~~~~



Dicho esto, explicare los endPoitns y que necesitamos enviar para que funcione.


## User
 En nuestra capeta de controllers, en nuestro archivo **user.js**, tenemos todas las rutas que necesita nuestro usuario.

Para crear un Usria tenemos que pasar los siguientes parametros con un POST, pasando lo siguientes datos en el body.
Esto les regresara un token  
![Postman CreateUser](/imgREADME/createUser.png)
![Postman CreateUser](/imgREADME/token.png)


Para ver que nuestro usuario esta autentificado tenemos que hacer un GET, donde le vamos a pasar el Token que genera una vez que se creo el usuario.



