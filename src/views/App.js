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


  const drawGraphs = () => {
    var nodes = [];
    var edges = [];
    Object.values(automata).forEach((element) => {
      //console.log("element", element);
      if (element) {
        //console.log(element.EdosAFN, Object.entries(element.EdosAFN));
        element.EdosAFN.forEach((edo) => {
          //console.log(edo);
          nodes.push({ id: edo.IdEstado, label: `${edo.IdEstado}` });
          edo.Trans.forEach((trans) => {
            //console.log(trans, trans.__edo__);
            edges.push({ from: edo.IdEstado, to: trans.__edo__.IdEstado, label: trans.__simbInf__ === trans.__simbSup__ ? trans.__simbInf__ : `${trans.__simbInf__}-${trans.__simbSup__}` });
          })
        })
      }
    })
    setNodesArray(nodes);
    setEdgesArray(edges);
    //console.log('Nodes', nodes);
    //console.log('Edge', edges);
  }

  React.useEffect(() => {
    //console.log(automata);
    drawGraphs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[automata]);

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
          <AutomataList automata={automata} onAutomataChange={setAutomata} />
        </Grid>
        <Grid item xs={8} className={classes.graphPaper} >
          <AutomataGraphs nodesArray={nodesArray} edgesArray={edgesArray} />
        </Grid>
      </Grid>
    </div>
  );
}