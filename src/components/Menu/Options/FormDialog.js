import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    formInput: {
        marginTop: "1rem",
        marginBottom: "1rem"
    }
});

export default function FormDialog({ keyForm, automata, onAutomataChange, open, setOpen, setDialog}) {
    const classes = useStyles();

    const forms = {
        'AddBasic': <DialogContent>
            <DialogContentText>
                Select a symbol for a NFA
            </DialogContentText>
            <TextField
                className={classes.formInput}
                autoFocus
                margin="dense"
                id="name"
                label="Symbol"
                fullWidth
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
                <MenuItem value={null}>Select</MenuItem>
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
            >
                <MenuItem value={null}>Select</MenuItem>
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
            >
                <MenuItem value={null}>Select</MenuItem>
            </Select>
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

    useEffect(()=>{
        setSelectedForm(forms[keyForm]);
    }, [keyForm]);

    const handleClose = () => {
        setOpen(false);
        setDialog(null);
    };

    const handleForm = () => {
        setOpen(false);
        setDialog(null);

        switch (keyForm) {
            case "Add Basic":
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
                break;
            case "Union for lexical analyzer":
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
                <DialogTitle id="form-dialog-title">Action</DialogTitle>
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