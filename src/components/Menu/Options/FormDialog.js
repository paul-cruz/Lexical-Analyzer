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
    const [selectedOption, setSelectedOption] = React.useState('');
    const [selectedOption2, setSelectedOption2] = React.useState("");

    const getAutomatas = () => (
        Object.keys(automata).map(key=>(
            <MenuItem value={key} name={key}>{key}</MenuItem>
        ))
    )

    const selectedAFN = (event) => {
        const key = event.target.value;
        setSelectedOption(automata[key]);
    }

    const selectedAFN2 = (event) => {
        const key = event.target.value;
        setSelectedOption2(automata[key]);
    }

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
                Select 2 NFAs to Join them
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA 1</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN2"
                fullWidth
            >
            </Select>

            <InputLabel id="demo-simple-select-label">NFA 2</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
            </Select>
        </DialogContent>,
        'Concat': <DialogContent>
            <DialogContentText>
                Select 2 NFAs to concatenate them
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA 1</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">NFA 2</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN2"
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
            </Select>
        </DialogContent>,
        'Positive Closure': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Positive Closure
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
            </Select>
        </DialogContent>,
        'Kleene Closure': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Kleene Closure
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">NFA</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
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
                fullWidth
                onChange={selectedAFN}
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
                fullWidth
                onChange={selectedAFN}
            >
                <MenuItem value={null}>Select</MenuItem>
                {getAutomatas()}
            </Select>

            <InputLabel id="demo-simple-select-label">Union with</InputLabel>
            <Select
                className={classes.formInput}
                margin="dense"
                id="AFN1"
                fullWidth
                onChange={selectedAFN2}
            >
                <MenuItem value={null}>Select</MenuItem>
                {getAutomatas()}
            </Select>

            <TextField
                className={classes.formInput}
                autoFocus
                margin="dense"
                id="token"
                label="Token"
                defaultValue={symbol}
                onChange={(e) => { setSymbol(e.target.value) }}
                fullWidth
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
                fullWidth
            >
                <MenuItem value={null}>Select</MenuItem>
            </Select>
        </DialogContent>,
        'Analyze string': <DialogContent>
            <DialogContentText>
                Introduce a string to analyze it
            </DialogContentText>
            <TextField
                className={classes.formInput}
                autoFocus
                margin="dense"
                id="name"
                label="String to analyze"
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
    }, [keyForm]);

    const handleClose = () => {
        setOpen(false);
        setDialog(null);
    };

    const handleForm = (e) => {
        setOpen(false);
        setDialog(null);
        let nuevoAFN;

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
                break;
            case "Concat":
                break;
            case "Positive Closure":
                break;
            case "Kleene Closure":
                break;
            case "Once or none":
                nuevoAFN = selectedOption;
                onAutomataChange({...automata, [selectedOption]: nuevoAFN.opcional()});
                break;
            case "Union for lexical analyzer":
                nuevoAFN = selectedOption;
                console.log(selectedOption, selectedOption2, symbol);
                //onAutomataChange({...automata, [selectedOption]: nuevoAFN.UnionEspecialAFNs()});
                
                break;
            case "Convert NFA to DFA":
                break;
            case "Analyze string":
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