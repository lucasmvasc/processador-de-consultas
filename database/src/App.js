
import { OrgDiagram } from 'basicprimitivesreact';
import { PageFitMode, Enabled, ChildrenPlacementType } from 'basicprimitives';
import { validate } from './helpers/validator';
import { parse } from './helpers/parser';
import { fillGraph } from './helpers/graph';
import './App.css';

const App = () => {
  const config = {
    pageFitMode: PageFitMode.None,
    maximumColumnsInMatrix: 2,
    cursorItem: 1,
    highlightItem: 0,
    normalItemsInterval: 20,
    cousinsIntervalMultiplier: 1,
    defaultTemplateName: "info",
    templates: [{
      name: "info",
      itemSize: { width: 80, height: 40 },
      minimizedItemSize: { width: 3, height: 3 },
      highlightPadding: { left: 4, top: 4, right: 4, bottom: 4 },
      onItemRender: ({ context: itemConfig }) => {
        return <div className="InfoTemplate">{itemConfig.title}</div>;
      }
    }],
    hasSelectorCheckbox: Enabled.False,
    items: [
      /* horizontal layout example */
      {
        id: 201,
        parent: null,
        title: "Horizontal Layout",
        childrenPlacementType: ChildrenPlacementType.Horizontal
      },
      { id: 202, parent: 201, title: "Child 1" },
      { id: 203, parent: 201, title: "Child 2" },
      { id: 204, parent: 201, title: "Child 3" }
    ]
  };

  const clickHandler = () => {
    let query = document.getElementsByClassName('form-control')[0].value
    let obj = parse(query)
    if(validate(obj)) {
        let graph = fillGraph(obj)
        graph.edges.forEach(edge => {console.log(edge)})
    }

  }

  return (<>
    <h2>Processador de Consultas</h2>
    <label htmlFor="query-textarea">Digite sua consulta SQL:</label>
    <div className="input-group" id="query-textarea">
      <textarea className="form-control" aria-label="Digite sua consulta SQL"></textarea>
    </div>
    <button type="button" className="btn btn-primary" onClick={clickHandler}>Mostrar resultado</button>
    <div id="placeholder"><OrgDiagram centerOnCursor={true} config={config} />  </div>
    
  </>);
}

export default App;
