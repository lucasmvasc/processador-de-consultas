import { useState } from 'react'
import { OrgDiagram } from 'basicprimitivesreact';
import { PageFitMode, Enabled, ChildrenPlacementType } from 'basicprimitives';
import { validate } from './helpers/validator';
import { parse } from './helpers/parser';
import { fillGraph } from './helpers/graph';
import './App.css';

const App = () => {
  const [showGraph, setShowGraph] = useState(false)
  const [showError, setShowError] = useState(false)
  const [config, setConfig] = useState({
    pageFitMode: PageFitMode.None,
    maximumColumnsInMatrix: 2,
    cursorItem: 1,
    highlightItem: 0,
    normalItemsInterval: 20,
    cousinsIntervalMultiplier: 1,
    defaultTemplateName: "info",
    templates: [{
      name: "info",
      minimizedItemSize: { width: 3, height: 3 },
      highlightPadding: { left: 4, top: 4, right: 4, bottom: 4 },
      onItemRender: ({ context: itemConfig }) => {
        return <div className="InfoTemplate">{itemConfig.title}</div>;
      }
    }],
    hasSelectorCheckbox: Enabled.False
  })

  const clickHandler = () => {
    let query = document.getElementsByClassName('form-control')[0].value

    try {
      let obj = parse(query)
      if(validate(obj)) {
        let graph = fillGraph(obj)
        let items = []

        graph.nodes.filter((el) => el.symbol !== '').forEach(node => {
          items.push({id: node.id, title: formatSymbol(node.symbol)})
        })

        graph.edges.forEach(edge => {
          items.find(el => el.id == edge.nextNodeId.id).parent = edge.previousNodeId.id
        })

        let start = items.find(el => !el.parent)
        start.parent = null
        start.childrenPlacementType = ChildrenPlacementType.Horizontal

        setConfig({...config, items: items})
        setShowGraph(true)
        setShowError(false)
      }
    } catch (error) {
      setShowGraph(false)
      setShowError('Consulta SQL inválida!')
    }
  }

  const formatSymbol = (symbol) => {
    return (typeof symbol == 'object') ? symbol.join(', ') : symbol
  }

  return (<>
    <h2>Processador de Consultas</h2>
    <label htmlFor="query-textarea">Digite sua consulta SQL:</label>
    <div className="input-group" id="query-textarea">
      <textarea className="form-control" aria-label="Digite sua consulta SQL"></textarea>
    </div>
    <button type="button" className="btn btn-primary" onClick={clickHandler}>Mostrar resultado</button>

    {showGraph &&
    <div id="placeholder"><OrgDiagram centerOnCursor={true} config={config}/></div>}

    {showError && <p className="text-danger">{showError}</p>}
  </>);
}

export default App;
