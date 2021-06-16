import React from 'react';
import FormDialog from './Options/FormDialog';
import { menuOptions } from '../../utils/menuOptions';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
        setDialog(<FormDialog open={openDialog || true} setDialog={setDialog} setOpen={setOpenDialog} keyForm={key} automata={automata} onAutomataChange={onAutomataChange} onChooseDialog={onChooseDialog}/>);
    }

    const handleOption = (event, newValue) => {
        setValue(newValue);
        onChooseDialog(menuOptions[newValue].label);
        setOpenDialog(true);
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