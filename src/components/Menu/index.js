import React from 'react';
import FormDialog from './Options/FormDialog';
import { menuOptions } from '../../utils/menuOptions';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SignalCellularNull } from '@material-ui/icons';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#BED2FA'
        }
    }
});

const useStyles = makeStyles({
    root: {
        height: '10vh',
        width: '100%',
        backgroundColor: '#39507E',
        color: '#FFFFFF'
    },
});

export default function Menu({ automata, onAutomataChange }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialog, setDialog] = React.useState(null);

    const onChooseDialog = (key) => {
        setDialog(<FormDialog open={openDialog} setOpen={setOpenDialog} keyForm={key} automata={automata} onAutomataChange={onAutomataChange} />);
    }

    const handleOption = (event, newValue) => {
        setValue(newValue);
        switch (menuOptions[newValue].label) {
            case "Add Basic":
                onChooseDialog('AddBasic');
                setOpenDialog(true);
                break;
            case "Join":
                onChooseDialog("Join");
                setOpenDialog(true);
                break;
            case "Concat":
                onChooseDialog("Concat");
                setOpenDialog(true);
                break;
            case "Positive Closure":
                onChooseDialog("Positive Closure");
                setOpenDialog(true);
                break;
            case "Klenee Closure":
                onChooseDialog("Klenee Closure");
                setOpenDialog(true);
                break;
            case "Once or none":
                onChooseDialog("Once or none");
                setOpenDialog(true);
                break;
            case "Union for lexical analyzer":
                onChooseDialog("Union for lexical analyzer");
                setOpenDialog(true);
                break;
            case "Convert NFA to DFA":
                onChooseDialog("Convert NFA to DFA");
                setOpenDialog(true);
                break;
            case "Analyze string":
                onChooseDialog("Analyze string");
                setOpenDialog(true);
                break;
            case "Test lexical analyzer":
                onChooseDialog("Test lexical analyzer");
                setOpenDialog(true);
                break;
            default:
                break;
        }
        console.log(menuOptions[newValue]);
    }

    return (
        <ThemeProvider theme={theme}>

            <BottomNavigation
                value={value}
                onChange={handleOption}
                showLabels
                className={classes.root}
            >
                {menuOptions.map((element, index) => {
                    return <BottomNavigationAction key={index} classes={classes} label={element.label} icon={element.icon} />;
                })}
            </BottomNavigation>
            {dialog ? dialog : <div />}
        </ThemeProvider>
    );
}