import React, { useEffect } from 'react';
import AFN from './../../../classes/AFN';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AnalizadorLexico from '../../../classes/Class3';

const useStyles = makeStyles({
    formInput: {
        marginTop: "1rem",
        marginBottom: "1rem"
    }
});

export default function FormDialog({ keyForm, automata, onAutomataChange, open, setOpen, setDialog }) {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [symbol, setSymbol] = React.useState('');
    const [NFA1, setNFA1] = React.useState('');
    const [NFA2, setNFA2] = React.useState('');

    const getAutomatas = () => (
        Object.keys(automata).map(key=>(
            <MenuItem value={key} name={key}>{key}</MenuItem>
        ))
    );

    const forms = {
        'AddBasic': <DialogContent>
            <DialogContentText>
                Enter name and symbol for a NFA
            </DialogContentText>
            <TextField
                className={classes.formInput}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                defaultValue={name}
                onChange={(e) => { setName(e.target.value) }}
                fullWidth
            />
            <TextField
                className={classes.formInput}
                margin="dense"
                defaultValue={symbol}
                onChange={(e) => { setSymbol(e.target.value) }}
                fullWidth
                id="symbol"
                label="Symbol"
            />
        </DialogContent>,
        'Join': <DialogContent>
            <DialogContentText>
                Select 2 NFA to Join them
            </DialogContentText>
            <InputLabel id="nfa1-label">NFA 1</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
            >
                <MenuItem value={null} disabled>Select</MenuItem>
                {
                    Object.keys(automata).map((key) => {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>
                    })
                }
            </Select>
            <InputLabel id="nfa2-label">NFA 2</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN2"
                fullWidth
                defaultValue={NFA2 ? NFA2 : ''}
                onChange={(e) => setNFA2(e.target.value)}
            >
                <MenuItem value={null} disabled>Select</MenuItem>
                {
                    Object.keys(automata).map((key) => {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>
                    })
                }
            </Select>
        </DialogContent>,
        'Concat': <DialogContent>
            <DialogContentText>
                Select 2 NFAs to concatenate them
            </DialogContentText>
            <InputLabel id="nfa1-label">NFA 1</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
            >
                <MenuItem value={null} disabled>Select</MenuItem>
                {
                    Object.keys(automata).map((key) => {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>
                    })
                }
            </Select>
            <InputLabel id="nfa2-label">NFA 2</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN2"
                fullWidth
                defaultValue={NFA2 ? NFA2 : ''}
                onChange={(e) => setNFA2(e.target.value)}
            >
                <MenuItem value={null} disabled>Select</MenuItem>
                {
                    Object.keys(automata).map((key) => {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>
                    })
                }
            </Select>
        </DialogContent>,
        'Positive Closure': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Positive Closure
            </DialogContentText>
            <InputLabel id="nfa1-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
            >
                <MenuItem value={null} disabled>Select</MenuItem>
                {
                    Object.keys(automata).map((key) => {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>
                    })
                }
            </Select>
        </DialogContent>,
        'Kleene Closure': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Kleene Closure
            </DialogContentText>
            <InputLabel id="nfa1-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
            >
                <MenuItem value={null} disabled>Select</MenuItem>
                {
                    Object.keys(automata).map((key) => {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>
                    })
                }
            </Select>
        </DialogContent>,
        'Once or none': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Once or none
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
                {getAutomatas()}
            </Select>
        </DialogContent>,
        'Union for lexical analyzer': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Union for lexical analyzer
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
                {getAutomatas()}
            </Select>
            <TextField
                className={classes.formInput}
                margin="dense"
                defaultValue={symbol}
                onChange={(e) => { setSymbol(e.target.value) }}
                fullWidth
                id="symbol"
                label="Token"
            />
        </DialogContent>,
        'Convert NFA to DFA': <DialogContent>
            <DialogContentText>
                Select an NFA to convert to DFA
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
                {getAutomatas()}
            </Select>
        </DialogContent>,
        'Analyze string': <DialogContent>
            <DialogContentText>
                Introduce a string to analyze it
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                defaultValue={NFA1 ? NFA1 : ''}
                onChange={(e) => setNFA1(e.target.value)}
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
                {getAutomatas()}
            </Select>
            <TextField
                className={classes.formInput}
                autoFocus
                margin="dense"
                id="name"
                label="Analyze string"
                defaultValue={symbol}
                onChange={(e) => { setSymbol(e.target.value) }}
                fullWidth
            />
        </DialogContent>,
        'Test lexical analyzer': <DialogContent>
            <DialogContentText>
                Test lexical analyzer
            </DialogContentText>
            <TextField
                className={classes.formInput}
                margin="dense"
                id="name"
                label="Test"
                fullWidth

            />
        </DialogContent>,
    };

    const [selectedForm, setSelectedForm] = React.useState(forms[keyForm]);

    useEffect(() => {
        setSelectedForm(forms[keyForm]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyForm]);

    const handleClose = () => {
        setOpen(false);
        setDialog(null);
    };

    const handleForm = (e) => {
        setOpen(false);
        setDialog(null);

        switch (keyForm) {
            case "AddBasic":
                const newAFN = new AFN();
                if (symbol.includes('-')) {
                    var range = symbol.split('-');
                    newAFN.CrearAFNBasicoParams(range[0], range[1]);
                } else {
                    newAFN.CrearAFNBasico(symbol);
                }
                onAutomataChange({ ...automata, [name]: newAFN });
                break;
            case "Join":
                if (NFA1 !== NFA2) {
                    const dest = automata[NFA1];
                    dest.UnirAFN(automata[NFA2]);
                    delete automata[NFA2];
                    onAutomataChange({ ...automata, [NFA1]: dest });
                }
                break;
            case "Concat":
                if (NFA1 !== NFA2) {
                    const dest = automata[NFA1];
                    dest.ConcAFN(automata[NFA2]);
                    delete automata[NFA2];
                    onAutomataChange({ ...automata, [NFA1]: dest });
                }
                break;
            case "Positive Closure":
                if (NFA1) {
                    const dest = automata[NFA1];
                    dest.cerrPos();
                    onAutomataChange({ ...automata, [NFA1]: dest });
                }
                break;
            case "Kleene Closure":
                if (NFA1) {
                    const dest = automata[NFA1];
                    dest.cerrKleene();
                    onAutomataChange({ ...automata, [NFA1]: dest });
                }
                break;
            case "Once or none":
                const dest = automata[NFA1];
                onAutomataChange({...automata, [NFA1]: dest.opcional()});
                break;
            case "Union for lexical analyzer":
                if(NFA1 && symbol){
                    if(automata["AFNLex1"]){
                        const dest = automata["AFNLex1"];
                        dest.UnionEspecialAFNs(automata[NFA1], symbol);
                        onAutomataChange({...automata, ["AFNLex1"]: dest})
                        delete automata[NFA1];
                    } else {
                        const dest = new AFN();
                        dest.UnionEspecialAFNs(automata[NFA1], symbol);
                        onAutomataChange({...automata, ["AFNLex1"]: dest})
                        delete automata[NFA1];
                    }
                    
                    break;
                }
            case "Convert NFA to DFA":
                if(NFA1){
                    const dest = automata[NFA1];
                    console.log(dest.ConvAFNaAFD());
                }
                break;
            case "Analyze string":
                if(symbol){
                    const dest = automata[NFA1];
                    const string2Analyze = symbol;
                    console.log(AnalizadorLexico.AnalizLexic(string2Analyze, dest).yylex());
                    if(true){
                        alert("It's a valid tring!");
                    } else {
                        alert("It's an invalid string!");
                    }
                    
                }
                break;
            case "Test lexical analyzer":
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{keyForm}</DialogTitle>
                {selectedForm ? selectedForm : null}
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button onClick={handleForm}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}