import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';

export default function FormDialog({ keyForm, automata, onAutomataChange, open, setOpen }) {

    const forms = {
        'div': <div />,
        'AddBasic': <DialogContent>
            <DialogContentText>
                Select a symbol for a NFA
            </DialogContentText>
            <TextField
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
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
            <Select
                autoFocus
                margin="dense"
                id="AFN2"
                label="AFN 2"
                fullWidth
            />
        </DialogContent>,
        'Concat': <DialogContent>
            <DialogContentText>
                Select 2 NFAs to concatenate them
            </DialogContentText>
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
            <Select
                autoFocus
                margin="dense"
                id="AFN2"
                label="AFN 2"
                fullWidth
            />
        </DialogContent>,
        'Positive Closure': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Positive Closure
            </DialogContentText>
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
        </DialogContent>,
        'Klenee Closure': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Klenee Closure
            </DialogContentText>
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
        </DialogContent>,
        'Once or none': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Once or none
            </DialogContentText>
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
        </DialogContent>,
        'Union for lexical analyzer': <DialogContent>
            <DialogContentText>
                Select an NFA to apply Union for lexical analyzer
            </DialogContentText>
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
        </DialogContent>,
        'Convert NFA to DFA': <DialogContent>
            <DialogContentText>
                Select an NFA to convert to DFA
            </DialogContentText>
            <Select
                autoFocus
                margin="dense"
                id="AFN1"
                label="AFN 1"
                fullWidth
            />
        </DialogContent>,
        'Analyze string': <DialogContent>
            <DialogContentText>
                Introduce a string to analyze it 
            </DialogContentText>
            <TextField
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
                autoFocus
                margin="dense"
                id="name"
                label="Test"
                fullWidth
            />
        </DialogContent>,
    };

    const [selectedForm, setSelectedForm] = React.useState(forms[keyForm]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleForm = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Action</DialogTitle>
                {selectedForm}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleForm} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}