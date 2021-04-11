import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { menuOptions } from '../../utils/menuOptions'
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

export default function Menu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <ThemeProvider theme={theme}>

            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                {menuOptions.map((element, index) => {
                    return <BottomNavigationAction key={index} classes={classes} label={element.label} icon={element.icon} />;
                })}
            </BottomNavigation>
        </ThemeProvider>
    );
}