const database = {
    "Usuario": ["idUsuario", "Nome", "Logradouro", "Número", "Bairro", "CEP", "UF", "DataNascimento"],
    "Contas": ["idConta", "Descricao", "TipoConta_idTipoConta", "Usuario_idUsuario", "SaldoInicial"],
    "Movimentacao": ["idMovimentacao", "DataMovimentacao", "Descricao", "TipoMovimento_idTipoMovimento", "Categoria_idCategoria", "Contas_idConta", "Valor"],
    "TipoConta": ["idTipoConta", "Descricao"],
    "TipoMovimento": ["idTipoMovimento", "DescMovimentacao"],
    "Categoria": ["idCategoria", "DescCategoria"]
}

const validate = (arr) => {
    let select = arr.find(el => el.value == 'SELECT')
    let from = arr.find(el => el.value == 'FROM')
    let where = arr.find(el => el.value == 'WHERE')
    let join = arr.filter(el => el.value == 'JOIN')
    
    let fromRef = arr.find(el => el.id == from.id + 1)
    if(!includesTable(fromRef.value)) return [false, "from"]

    if(where){
        let whereRef = arr.find(el => el.id == where.id + 1)
        if(!includesAttribute(fromRef.value, whereRef.value.lhs)) return false
    }

    if(join){
        for(let i = 0; i < join.length; i++){
            let joinRef = arr.find(el => el.id == join[i].id + 1)
            if(!includesTable(joinRef.value)) return false
            
            if(arr.find(el => el.id == join[i].id + 2).type !== 'command') return false

            let onRef = arr.find(el => el.id == join[i].id + 3) //retorna um comparison
            if(!includesAttribute(fromRef.value, onRef.value.lhs)) return false
            if(!includesAttribute(joinRef.value, onRef.value.rhs)) return false

            let selectRef = arr.find(el => el.id == select.id + 1)
            if(selectRef.value !== '*'){
                for(let i = 0; i < selectRef.value.length; i++){
                    if(!includesAttribute(fromRef.value, selectRef.value[i]) && !includesAttribute(joinRef.value, selectRef.value[i])) return false
                }
            }
        }
    } else {
        let selectRef = arr.find(el => el.id == select.id + 1)
        if(selectRef.value !== '*'){
            for(let i = 0; i < selectRef.value.length; i++){
                if(!includesAttribute(fromRef.value, selectRef.value[i])) return false
            }
        }
    }

    return true
}

const includesTable = (value) => Object.keys(database).map(el => el.toLowerCase()).includes(value.toLowerCase())
const includesAttribute = (table, value) => {
    if(value.includes("."))
        return database[Object.keys(database).find(key => key.toLowerCase() === table.toLowerCase())].map(el => el.toLowerCase()).split('.')[1].includes(value.toLowerCase())
    else
        return database[Object.keys(database).find(key => key.toLowerCase() === table.toLowerCase())].map(el => el.toLowerCase()).includes(value.toLowerCase())
}

module.exports = {
    validate
}