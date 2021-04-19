import React from 'react';
import './../styles/App.css';
import Menu from './../components/Menu';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AutomataList from './../components/AutomataList';
import AutomataGraphs from './../components/AutomataGraphs';

const useStyles = makeStyles({
  grid: {
    height: '100%'
  }, graphPaper: {
    height: '100%'
  },
});

export default function App() {
  const classes = useStyles();
  const [automata, setAutomata] = React.useState({});
  const [nodesArray, setNodesArray] = React.useState([]);
  const [edgesArray, setEdgesArray] = React.useState([]);
  const [selectedAutomata, setSelectedAutomata] = React.useState(null);


  const drawGraphs = () => {
    var nodes = [];
    var edges = [];

    const element = selectedAutomata ? automata[selectedAutomata] : Object.keys(automata).length > 0 ? Object.values(automata)[0] : null;
    console.log(element);
    if (element) {
      var newNode;
      element.EdosAFN.forEach((edo) => {
        newNode = { id: edo.IdEstado, label: `${edo.IdEstado}` };
        if (edo.EdoAcept) {
          newNode = { ...newNode, font: { color: 'white' }, color: 'red' };
        } else if (element.EdoIni === edo) {
          newNode = { ...newNode, font: { color: 'white' }, color: 'green' };
        }
        nodes.push(newNode);
        edo.Trans.forEach((trans) => {
          edges.push({ from: edo.IdEstado, to: trans.__edo__.IdEstado, label: trans.__simbInf__ === trans.__simbSup__ ? trans.__simbInf__ : `${trans.__simbInf__}-${trans.__simbSup__}` });
        })
      })
    }
    setNodesArray(nodes);
    setEdgesArray(edges);
  }

  React.useEffect(() => {
    //console.log(automata);
    drawGraphs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAutomata, automata]);

  return (
    <div className="App">
      <header className="App-header"><Menu automata={automata} onAutomataChange={setAutomata} /></header>
      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
        className={classes.grid}>
        <Grid item xs={4} >
          <AutomataList automata={automata} setSelectedAutomata={setSelectedAutomata} />
        </Grid>
        <Grid item xs={8} className={classes.graphPaper} >
          <AutomataGraphs nodesArray={nodesArray} edgesArray={edgesArray} />
        </Grid>
      </Grid>
    </div>
  );
}