import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Typography><pre>{children}</pre></Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#5475B5',
        color: 'white',
        display: 'flex',
        height: '90vh',
    },
    tabs: {
        width: "50%",
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    childrenText: {
        whiteSpace: "nowrap"
    }
}));

export default function AutomataList({ automata, setSelectedAutomata }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedAutomata(event.target.innerText);
    };

    const convertJSON = (jsonContent) => {
        const infoJson = { edoIni: null, edosAcept: [], transiciones: {}, alfabeto: [] };
        console.log(jsonContent);
        Object.keys(jsonContent).forEach((key) => {
            switch (key) {
                case "EdoIni":  //inicial
                    infoJson.edoIni = jsonContent[key].IdEstado;
                    break;
                case "EdosAcept":   //Edos de acept
                    jsonContent[key].forEach(edo => {
                        infoJson.edosAcept.push(edo.IdEstado);
                    });
                    break;
                case "EdosAFN":     //Trancisiones de estados

                    jsonContent[key].forEach(trans => {
                        trans.Trans.forEach(transicion => {
                            console.log(transicion);
                            const simbInf = transicion.__simbInf__;
                            const simbSup = transicion.__simbSup__;
                            const edoTrans = transicion.__edo__.IdEstado;

                            if (simbInf === simbSup) {  //Mismo simbolo
                                if (infoJson.transiciones[trans.IdEstado]) {  //Ya tiene una transicion
                                    infoJson.transiciones[trans.IdEstado].push(`${simbSup} -> ${edoTrans}`)
                                } else {    //se agrega la primera transicion
                                    infoJson.transiciones[trans.IdEstado] = [];
                                    infoJson.transiciones[trans.IdEstado].push(`${simbSup} -> ${edoTrans}`)
                                }
                            } else {    //Rango de simbolos

                            }
                        });
                    });
                    break;
                case "Alfabeto":       //Alfabeto del AFN
                    jsonContent[key].forEach(symbol => {
                        infoJson.alfabeto.push(symbol);
                    });
                    break;
                default:
                    break;
            }
        });
        //console.log(JSON.stringify(infoJson, null, 2));
        return JSON.stringify(infoJson, null, 2);
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {
                    Object.keys(automata).map(auto => (
                        <Tab label={auto} {...a11yProps(0)} />
                    ))
                }
            </Tabs>

            {
                Object.keys(automata).map((auto, index) => (
                    <TabPanel value={value} index={index}>
                        {convertJSON(automata[auto])}
                    </TabPanel>
                ))
            }
        </div>
    );
}