class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    getNodes() { return this.nodes; }

    getNodeByIndex(index) { return this.nodes.find(el => el.id == index); }

    getEdges() { return this.edges; }

    getEdgeByIndex(index) { return this.edges.find(el => el.id == index); }
    
    getEdgeSize(){ return this.edges.length/2 }

    addNode(node) { this.nodes.push(node); }

    addEdge(edge) { this.edges.push(edge); }

    addEdges(edges) { this.edges.push(edges); }
}

class Node {
    constructor(value, type, id) { 
        this.symbol = ''
        this.value = value;
        this.type = type;
        this.id = id
    }
}

class Edge {
    constructor(previousNodeId, nextNodeId) { 
        this.previousNodeId = previousNodeId;
        this.nextNodeId = nextNodeId;
    }

    next() {
        return this.nextNodeId;
    }

    before() {
        return this.previousNodeId;
    }
}

let test = [
    {value: 'SELECT', type: 'command', id: 0},
    {value: ['Nome', 'Datanascimento', 'idConta', 'Descricao'], type: 'database', id: 1},
    {value: 'FROM', type: 'command', id: 2},
    {value: 'usuario', type: 'database', id: 3},
    {value: 'JOIN', type: 'command', id: 4},
    {value: 'Contas', type: 'database', id: 5},
    { value: 'ON', type: 'command', id: 6 },
    {value: { lhs: 'idusuario', operator: '=', rhs: 'Usuario_idUsuario' }, type: 'comparison', id: 7 }
]

let test2 = [
    {value: 'SELECT', type: 'command', id: 0},
    {value: '*', type: 'database', id: 1},
    {value: 'FROM', type: 'command', id: 2},
    {value: 'usuario', type: 'database', id: 3},
    {value: 'JOIN', type: 'command', id: 4},
    {value: 'Contas', type: 'database', id: 5},
    { value: 'ON', type: 'command', id: 6 },
    {value: { lhs: 'idusuario', operator: '=', rhs: 'Usuario_idUsuario' }, type: 'comparison', id: 7 }
]

const fillGraph = (nodeArray) => {
    let graph = new Graph()
    
    nodeArray.forEach(el => {
        let node = new Node(el.value, el.type, el.id)
        graph.addNode(node)
    })

    let nodes = graph.getNodes()
    let select = nodes.find(el => el.value == 'SELECT')
    let from = nodes.find(el => el.value == 'FROM')
    let where = nodes.find(el => el.value == 'WHERE')
    let join = nodes.find(el => el.value == 'JOIN')
    let on = nodes.find(el => el.value == 'ON')

    if (select) {
        let selectRef = nodes.find(el => el.id == select.id + 1)

        if (selectRef.value == '*') {
            if (where) {
                selectRef.symbol = `${whereRef.value.lhs} ${whereRef.value.operator} ${whereRef.value.rhs}`
                select.symbol = 'σ'

                edge = new Edge(select, selectRef)
                graph.addEdge(edge)
            }

            else if (join) {
                join.symbol = '⋈'
                fromRef = nodes.find(el => el.id == from.id + 1)
                joinRef = nodes.find(el => el.id == join.id + 1)
                onRef = nodes.find(el => el.id == on.id + 1)


                fromRef.symbol = fromRef.value
                onRef.symbol = `${onRef.value.lhs} ${onRef.value.operator} ${onRef.value.rhs}`
                joinRef.symbol = joinRef.value

                edge1 = new Edge(join, fromRef)
                edge2 = new Edge(join, joinRef)
                edge3 = new Edge(join, onRef)

                graph.addEdges({edge1,edge2,edge3})
            }

        } else {
            selectRef.symbol = selectRef.value
            select.symbol = 'π'
            graph.addEdge(select, selectRef)
        }

    }

    console.log(graph.nodes)
    graph.edges.forEach(el => {
        console.log(el)
    })
}
/*
* TODO: Add more cases to select ELSE scenario (JOIN and WHERE)
* TODO: Think in another possible cases to be handled by the graph
* TODO: Create the basics for the UI such as: 
        • Textarea for the sql query
        • Button for submit
        • Graph
*/
fillGraph(test2)