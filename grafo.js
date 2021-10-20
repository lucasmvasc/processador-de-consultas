class Grafo {

    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    getNodes() { return this.nodes; }

    getNodeByIndex(index) { return this.nodes[index]; }

    getEdges() { return this.edges; }

    getEdgeByIndex(index) { return this.edges[index]; }
    
    getEdgeSize(){ return this.edges.length/2 }

    addNode(node) { this.nodes.push(node); }

    addNodes(nodes) { this.nodes.push(nodes); }

    addEdge(edge) { this.edges.push(edge); }

    addEdges(edges) { this.edges.push(edges); }

}

class Node {
    constructor(value, type, id) { 
        this.value = value;
        this.type = type;
        this.id = id
    }
}

class Edge {
    constructor(actualNodeId, nextNodeId) { 
        this.actualNodeId = actualNodeId;
        this.nextNodeId = nextNodeId;
    }

    next() {
        return this.nextNodeId;
    }
}
