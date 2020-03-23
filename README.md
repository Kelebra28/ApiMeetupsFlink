# Meetups Flink REST API

Esta Api esta creada con Node.js , express, cors, body-parce, mongoose, nodemon, dotenv, JTK y para la bade de datos utlice MongoDB NoSql por el motivo que no los modelos que use, no era necesario tantas relaciones por lo cual una NoSql quedaria perfecto.

Para ponder usar el Api de manera local tenemos que clonar el repositorio, ir a la terminal en donde se clono y poner el comdando *npm i* para que istale todas las dependecias que se utilzaron, despues *npm start*

~~~~
npm i

npm start
~~~~
Crearemos un archivo .env para poner las siguientes variables de entiorno:

~~~~
DB_CONNECTION=mongodb+srv://<User>:<Password>@cluster0-4gajq.mongodb.net/test?retryWrites=true&w=majority
JWT_KEY=FlinkTest


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

![Postman Auth](/imgREADME/sendToken.png)


Para suscribirlo a un evento es un PATCH para actualizar el evento, pasando el ID de Evento y en el body mandamos email y password para poder añadir al usuario.

![Postman Suscribe](/imgREADME/sucribe.png)



Para ver los usuarios en paginacion es con un metodo GET ,
en donde en los parametros pasaremos un *page* (Cada 10 user es una nueva pagina), y el limit que es el limite de usuarios que qeremos(Puede ser el numero que sea) o podemos pasarlo directamente desde la URL.\
**http://localhost:4000/user/paginationUser?page=1&limit10**
![Postman pagination](/imgREADME/pagination.png)

Para hacer el login utilizamos el metodo POST y en el body mandamos el email y password.
![Postman login](/imgREADME/login.png)


## Event

Par crear el evento es parecido al usiario, tenemos que meter un email y cotraseña para que el evento que se ha creado tenga un alfitreon, el startHour y endHour se envian en la forma estadarizada de fecha,
Si te tiene un lugar se envia el sigiente fragmento dentro del json
el *_id* es el que se genera una vez creado el lugar.

~~~json
"place" : "_id"
~~~


![Postman CreateUser](/imgREADME/createEvent.png)


## Place

Para crar un Lugar pasamos lo siguiente en el body, al igual que el evento se necesita un usuario para poder crearlo.


![Postman CreateUser](/imgREADME/createPlace.png)



# Optener todos la Data
Simpelemte utilizamos el metodo GET y en la URL que es lo que queremos obtener,
Solo hay que cambiar la ruta para obtener los difentes datos.\

**http://localhost:4000/user/**\
**http://localhost:4000/event/**\
**http://localhost:4000/place/**\
![Postman updateUser](/imgREADME/getAll.png)

# Update

Si desean actualizar el usuario, evento o lugar usamos el metodo PATCH , en la ruta pasaremos el _id del usuario, evento o lugar(Generado por mongoDB) que deamos modificar. En el body lo que deseamos modificar.\
**http://localhost:4000/user/_id**\
**http://localhost:4000/event/_id**\
**http://localhost:4000/place/_id**
![Postman updateUser](/imgREADME/updateUser.png)




# Delete
Por ultimo para borrar a un usario, lugar , envento utlizamos el metodo DELETE y en el URL le pasaremos el _id del usuario, lugar o evento.\
**http://localhost:4000/user/_id** \
**http://localhost:4000/event/_id**\
**http://localhost:4000/place/_id**

![Postman deleteUSer](/imgREADME/deleteUser.png)


