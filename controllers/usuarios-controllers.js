const Usuarios = require("../models/usuario");

//CRUD
function findAllUsuarios(req, res) {
 Usuarios.find()
    .then((usuarios) => {
        console.log(usuarios);
        return res.status(200).json({
        error: false,
        message: "succes",
        code: 10,
        data: usuarios, //lista
    });

})
.catch( 
    (error) => { 
    console.log(error);
    return res.status(500).json({
    erro: true,
    message: "Error",
    code: 0,
    });
    } //funcion anonima del exec
); //exec
}

function createUser(req, res) {
  console.log("Creando usuario...");
  console.log(req.body);
  let usuario = new Usuarios({
    id : req.body.id,
    nombre: req.body.nombre,
    password: req.body.password,
    email: req.body.email
  });

  usuario
    .save(usuario)
    .then( (data) => {
        res.status(200).send({
            erro: false,
            message: "OK",
            code: 20,
            data: data,
        });
    })
    .catch( (error) => {
        res.status(500).send({
            error: true,
            message: "Server down",
            code: 0,
        });
    });
}

function findUsuario(req, res) {
    const id = req.params.id;

    Usuarios.findById(id)
    .then((data) => {
        if (data)
        res
        .status(404)
        .send( {
            message: "No encontrado"  + id,
        }); //datos vacios, no se encontro
        else res.send(data); //encontrado
    })
    .catch((error) => {
        res.status(500).send( { message: "Error con id" + id });
    });
}

function deleteUsuario(req,res){
    const id = req.params.id;

    console.log("\nBorrando usuario con id "+id+"...");
    Usuario.findByIdAndRemove(id)
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrado usuario con id "+id,
                });
            else{
                console.log("\nUsuario con id "+id+" borrado exitosamente.");
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({message: "Error en el usuario con id ",id});
        });
}

function updateUsuario(req,res){
    const id = req.params.id;

    console.log("\nCambiando contrasena al usuario con id "+id+"...");
    Usuario.findByIdAndUpdate(id,req.body)
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrado usuario con id "+id,
                });
            else{
                console.log("\nUsuario con id "+id+" ha cambiado su contrasena exitosamente. ");
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({message: "Error en el usuario con id ",id});
        });
}




module.exports = {
    findAllUsuarios,
    createUser,
    findUsuario,
    updateUsuario,
    deleteUsuario
};