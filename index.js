const express = require('express');
const connection = require('./db');
const path = require('path');
const app = express();

//encargado de parsear a los json
app.use(express.json ());

app.use(express.urlencoded({extended:true}));

//archivos html
app.use(express.static(path.join(__dirname, 'templates')));

//crear registros
app.post('/contact', (req,res)=>{
    const {cedula, nombres, apellidos, edad, telefono, email} = req.body;
    const query = 'INSERT INTO personas (cedula, nombres, apellidos, edad, telefono, email) VALUES (?,?,?,?,?,?)';
    connection.query(query, [cedula,nombres, apellidos, edad, telefono, email], (error, result)=>{

        if(error){
            res.status(500).json({error});
        }else{
            res.status(201).json({cedula: result.insertId, cedula, nombres, apellidos, edad,telefono, email});
        }
    });
});

// Datos del formulario
const data = {
    cedula: '1234567890',
    nombres: 'Juan',
    apellidos: 'Pérez',
    edad: 30,
    telefono: '123456789',
    email: 'juan@example.com'
};

// Hacer la solicitud POST
fetch('http://127.0.0.1:5500/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Indicamos que enviamos JSON
    },
    body: JSON.stringify(data) // Convertimos los datos a formato JSON
})
.then(response => response.json())
.then(data => {
    console.log('Respuesta del servidor:', data);
})
.catch(error => {
    console.error('Error:', error);
});







//puerto de conexion del servidor

const PORT = 3000;
app.listen(PORT, ()=>{

    console.log('servidor corriendo');
});