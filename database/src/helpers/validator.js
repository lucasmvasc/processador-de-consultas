const database = {
    "Usuario": ["idUsuario", "Nome", "Logradouro", "Número", "Bairro", "CEP", "UF", "DataNascimento"],
    "Contas": ["idConta", "Descricao", "TipoConta_idTipoConta", "Usuario_idUsuario", "SaldoInicial"],
    "Movimentacao": ["idMovimentacao", "DataMovimentacao", "Descricao", "TipoMovimento_idTipoMovimento", "Categoria_idCategoria", "Contas_idConta", "Valor"],
    "TipoConta": ["idTipoConta", "Descricao"],
    "TipoMovimento": ["idTipoMovimento", "DescMovimentacao"],
    "Categoria": ["idCategoria", "DescCategoria"]
}

const validate = (arr) => {
    let clonedArr = JSON.parse(JSON.stringify(arr))
    let select = clonedArr.find(el => el.value == 'SELECT')
    let from = clonedArr.find(el => el.value == 'FROM')
    let where = clonedArr.find(el => el.value == 'WHERE')
    let join = clonedArr.filter(el => el.value == 'JOIN')
    
    let fromRef = clonedArr.find(el => el.id == from.id + 1)
    if(!includesTable(fromRef.value)) return [false, "17"]

    if(where){
        let whereRef = clonedArr.find(el => el.id == where.id + 1)
        if(!includesAttribute(fromRef.value, whereRef.value.lhs)) return [false, "21"]
    }

    if(join){
        for(let i = 0; i < join.length; i++){
            let joinRef = clonedArr.find(el => el.id == join[i].id + 1)
            if(!includesTable(joinRef.value)) return [false, "27"]
            
            if(clonedArr.find(el => el.id == join[i].id + 2).type !== 'command') return [false, "29"]

            let onRef = clonedArr.find(el => el.id == join[i].id + 3) //retorna um comparison
            if(!includesAttribute(fromRef.value, onRef.value.lhs) && !includesAttribute(joinRef.value, onRef.value.rhs)) return [false, "32"]

            let selectRef = clonedArr.find(el => el.id == select.id + 1)
            if(selectRef.value !== '*'){
                for(let j = 0; j < selectRef.value.length; j++){
                    if(!includesAttribute(fromRef.value, selectRef.value[j]) && !includesAttribute(joinRef.value, selectRef.value[j])) return [false, "38"]
                    selectRef.value.splice(j, 1); 
                }
            }
        }
    } else {
        let selectRef = clonedArr.find(el => el.id == select.id + 1)
        if(selectRef.value !== '*'){
            for(let i = 0; i < selectRef.value.length; i++){
                if(!includesAttribute(fromRef.value, selectRef.value[i])) return [false, "46"]
            }
        }
    }

    return true
}

const includesTable = (value) => Object.keys(database).map(el => el.toLowerCase()).includes(value.toLowerCase())
const includesAttribute = (table, value) => {
    if(value.includes("."))
        return database[Object.keys(database).find(key => key.toLowerCase() === table.toLowerCase())].map(el => el.toLowerCase()).includes(value.toLowerCase().split('.')[1])
    else
        return database[Object.keys(database).find(key => key.toLowerCase() === table.toLowerCase())].map(el => el.toLowerCase()).includes(value.toLowerCase())
}

module.exports = {
    validate
}