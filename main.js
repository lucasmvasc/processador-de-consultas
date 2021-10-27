const validate = require('./validator.js').validate
const parse = require('./parser.js').parse
const fillGraph = require('./graph.js').fillGraph

let sample1 = `Select * from Usuario Where UF = 'CE';`
let sample2 = `Select Nome, Datanascimento, idConta, Descricao From usuario join Contas On (idusuario = Usuario_idUsuario);`
let sample3 = `Select Nome, Datanascimento, idConta from Usuario Where UF = 'CE';`
let sample4 = `SELECT usuario.idUsuario, usuario.Nome, contas.idConta, contas.Descricao,
contas.usuario_idUsuario, totmov.valor
FROM Usuario
Join contas
ON (Usuario.idusuario = contas.usuario_idusuario)
Join TotMov
On (totMov.Cod = contas.idconta);`

const execute = (query) => {
    let obj = parse(query)
    if(validate(obj)) fillGraph(obj)
}

execute(sample4)