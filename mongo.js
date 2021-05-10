const mongoose = require('mongoose') // Utilizamos la librería de mongoose

//Creamos la conexión con mongo
const connection = 'mongodb+srv://AdminUser:TestP9@tresenraya.4za0n.mongodb.net/TresEnRaya?retryWrites=true&w=majority'

//conexion a MongoDB

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log("Database Connected")
    }).catch(err => {
        console.error(err)
    })
    
    module.exports =  connection;