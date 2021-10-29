// classification main function
const parse = (query) => {
    query = query.replace(/(\r\n|\n|\r)/gm, " ") // remove line breaks
    query = query.replace(";", "") // remove ending semicolon
    
    let split = query.split(" ")
    let classified = []
    let id = 0;

    for(let i in split){
        let word = split[i]

        if(isCommand(word)){
            classified.push({value: word.toUpperCase(), type: 'command', id})
            id++
        }
        else if(isOperator(word)){
            if(classified[id-1].type == 'operator'){
                classified[id-1].value += " " + word
            } else {
                classified.push({value: word, type: 'operator', id})
                id++
            }
        }
        else {
            if(classified[id-1].type == 'database'){
                classified[id-1].value += " " + word
            } else {
                classified.push({value: word, type: 'database', id})
                id++
            }
        }
    }

    for(let i in classified){
        let current = classified[i]

        if(current.type == 'database'){
            if(current.value.includes(',')) current.value = convertToArray(current.value)
            else if(current.value.includes('(')) {
                classified[current.id] = {
                    value: { lhs: current.value.split('(')[1], operator: classified[current.id+1].value, rhs: classified[current.id+2].value.split(")")[0] }, 
                    type: 'comparison', 
                    id: current.id
                }
                classified[current.id+1].type = "null"
                classified[current.id+2].type = "null"
            }
            else if(classified[current.id+1].type == 'operator'){
                classified[current.id] = {
                    value: { 
                        lhs: current.value.includes('(') ? current.value.split('(')[1] : current.value, 
                        operator: classified[current.id+1].value, 
                        rhs: current.value.includes(')') ? classified[current.id+2].value.split(")")[0] : classified[current.id+2].value}, 
                    type: 'comparison', 
                    id: current.id
                }
                classified[current.id+1].type = "null"
                classified[current.id+2].type = "null"
            }
        }
    }

    classified = classified.filter(el => el.type !== "null")
    classified = classified.map((el, idx) => { return {...el, id: idx}})

    return classified
}

// classification helpers
const isCommand = (word) => word.toUpperCase().match(/^(SELECT|FROM|WHERE|JOIN|ON)$/) !== null
const isOperator = (word) => word.toUpperCase().match(/=|>|<|<=|>=|AND|IN|NOT/) !== null
const convertToArray = (words) => words.split(',').map(el => el.trim())

module.exports = {
    parse
}

/*
[
  { value: 'SELECT', type: 'command', id: 0 },
  {
    value: [ 'Nome', 'Datanascimento', 'idConta', 'Descricao' ],
    type: 'database',
    id: 1
  },
  { value: 'FROM', type: 'command', id: 2 },
  { value: 'usuario', type: 'database', id: 3 },
  { value: 'JOIN', type: 'command', id: 4 },
  { value: 'Contas', type: 'database', id: 5 },
  { value: 'ON', type: 'command', id: 6 },
  {
    value: { lhs: 'idusuario', operator: '=', rhs: 'Usuario_idUsuario' },
    type: 'comparison',
    id: 7
  }
]
*/