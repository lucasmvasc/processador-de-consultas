const validate = require('./database/src/helpers/validator.js').validate
const parse = require('./database/src/helpers/parser.js').parse
const fillGraph = require('./database/src/helpers/graph.js').fillGraph

let sample1 = `Select * from Usuario Where UF = 'CE';`
let sample2 = `Select Nome, Datanascimento, idConta, Descricao From usuario join Contas On (idusuario = Usuario_idUsuario);`
let sample3 = `Select Nome, Datanascimento, idConta from Usuario Where UF = 'CE';`
let sample4 = `SELECT usuario.idUsuario, usuario.Nome, contas.idConta, contas.Descricao,
contas.usuario_idUsuario
FROM Usuario
Join contas
ON (Usuario.idusuario = contas.usuario_idusuario);`
let sample5 = `SELECT usuario.idUsuario, usuario.Nome, contas.idConta, contas.Descricao,
contas.usuario_idUsuario, TipoConta.descricao
FROM Usuario
Join contas
ON (Usuario.idusuario = contas.usuario_idusuario)
Join TipoConta
ON (contas.TipoConta_idTipoConta = TipoConta.idTipoConta);`
let sample6 = `Select * From usuario join Contas On (idusuario = Usuario_idUsuario);`
let sample7 = `SELECT *
FROM Usuario
Join contas
ON (Usuario.idusuario = contas.usuario_idusuario)
Join TipoConta
ON (contas.TipoConta_idTipoConta = TipoConta.idTipoConta);`

const execute = (query) => {
    let obj = parse(query)
    if(validate(obj)) {
        let graph = fillGraph(obj)
        graph.edges.forEach(edge => {console.log(edge)})
    }
}

execute(sample7)