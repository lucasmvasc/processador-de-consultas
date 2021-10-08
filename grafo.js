class Grafo {

    constructor(nodes, edges) {
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