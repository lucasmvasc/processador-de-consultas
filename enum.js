const operators = {
    "=": "equals", 
    ">": "greater than",
    "<": "less than",
    "<=": "less than equals",
    ">=": "greater than equals",
    "<>": "not equal",
    "And": "and",
    "In": "in",
    "Not In": "not in"
}

const sql_operators = {
    "select": "select", 
    "From": "from",
    "Where": "where",
    "Join": "join"
}

module.exports = {
    operators,
    sql_operators
}