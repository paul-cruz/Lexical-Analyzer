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

  React.useEffect(() => {
    console.log(automata);
  });

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
          <AutomataGraphs />
        </Grid>
      </Grid>
    </div>
  );
}