const database = {
    "Usuario": ["idUsuario", "Nome", "Logradouro", "Número", "Bairro", "CEP", "UF", "DataNascimento"],
    "Contas": ["idConta", "Descricao", "TipoConta_idTipoConta", "Usuario_idUsuario", "SaldoInicial"],
    "Movimentacao": ["idMovimentacao", "DataMovimentacao", "Descricao", "TipoMovimento_idTipoMovimento", "Categoria_idCategoria", "Contas_idConta", "Valor"],
    "TipoConta": ["idTipoConta", "Descricao"],
    "TipoMovimento": ["idTipoMovimento", "DescMovimentacao"],
    "Categoria": ["idCategoria", "DescCategoria"]
}

let test = [
    {value: 'SELECT', type: 'command', id: 0},
    {value: ['Nome', 'Datanascimento', 'idConta', 'Descricao'], type: 'database', id: 1},
    {value: 'FROM', type: 'command', id: 2},
    {value: 'usuario', type: 'database', id: 3},
    {value: 'JOIN', type: 'command', id: 4},
    {value: 'Contas', type: 'database', id: 5},
    {value: { lhs: 'idusuario', operator: '=', rhs: 'Usuario_idUsuario' }, type: 'comparison', id: 6}
]

const validate = (arr) => {
    let select = arr.find(el => el.value == 'SELECT')
    let from = arr.find(el => el.value == 'FROM')
    let where = arr.find(el => el.value == 'WHERE')
    let join = arr.filter(el => el.value == 'JOIN')
    
    let fromRef = arr.find(el => el.id == from.id + 1)
    if(!Object.keys(database).map(el => el.toLowerCase()).includes(fromRef.value.toLowerCase())) return false

    let selectRef = arr.find(el => el.id == select.id + 1)
    if(selectRef.value !== '*'){
        selectRef.value.forEach(attr => {
            if(!database[Object.keys(database).find(key => key.toLowerCase() === fromRef.value.toLowerCase())]
                .map(el => el.toLowerCase()).includes(attr.toLowerCase())) return false
        })
    }

    if(where){
        let whereRef = arr.find(el => el.id == where.id + 1)
        if(!database[Object.keys(database).find(key => key.toLowerCase() === fromRef.value.toLowerCase())]
            .map(el => el.toLowerCase()).includes(whereRef.value.lhs.toLowerCase())) return false
    }

    if(join){
        join.forEach(obj => {
            let joinRef = arr.find(el => el.id == obj.id + 1)
            if(!Object.keys(database).map(el => el.toLowerCase()).includes(joinRef.value.toLowerCase())) return false
            
            if(arr.find(el => el.id == obj.id + 2).type !== 'command') return false

            let onRef = arr.find(el => el.id == obj.id + 3) //retorna um comparison
            if(!database[Object.keys(database).find(key => key.toLowerCase() === fromRef.value.toLowerCase())]
                .map(el => el.toLowerCase()).includes(onRef.value.lhs.toLowerCase())) return false
            if(!database[Object.keys(database).find(key => key.toLowerCase() === joinRef.value.toLowerCase())]
                .map(el => el.toLowerCase()).includes(onRef.value.rhs.toLowerCase())) return false
        })
    }

    return true
}

console.log(validate(test))

// TODO: Verificar se um retorno dentro do forEach retorna fora