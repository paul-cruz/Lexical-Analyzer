import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { saveAs } from "file-saver";
import serialize from "serialize-javascript";

import AFN from "./../../../classes/AFN";
import AFD from "../../../classes/AFD";
import CalculatorEval from "../../../classes/CalculatorEval";
import AnalizadorLexico from "../../../classes/AnalizadorLexico";
import Regex2NFA from "../../../classes/Regex2NFA";
import Gramars from "../../../classes/Gramars";
import TableLL1 from "../../TableLL1/TableLL1";
import LL1 from "../../../classes/LL1";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  root: {
    width: "100%",
    height: 200,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  tableLayout: {
    display: "inline-block",
  },
}));

export default function FormDialog({
  keyForm,
  automata,
  onAutomataChange,
  open,
  setOpen,
  setDialog,
  onChooseDialog,
}) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [NFA1, setNFA1] = React.useState("");
  const [NFA2, setNFA2] = React.useState("");
  const [lexemesShown, setLexemesShown] = React.useState(false);
  const [JSONAction, setJSONAction] = React.useState("Import"); //Import export action

  const getAutomatas = () =>
    Object.keys(automata).map((key) => (
      <MenuItem key={key} value={key} name={key}>
        {key}
      </MenuItem>
    ));

  const getDFAs = () =>
    Object.keys(automata)
      .filter((autKey) =>
        Object.keys(automata[autKey]).every((key) => AFD.hasOwnProperty(key))
      )
      .map((k) => (
        <MenuItem key={k} value={k} name={k}>
          {k}
        </MenuItem>
      ));

  const importExportContent = (
    <DialogContent>
      <DialogContentText>Import / Export</DialogContentText>
      <Select
        className={classes.formInput}
        margin="dense"
        id="IE"
        defaultValue={"Import"}
        onChange={(e) => setJSONAction(e.target.value)}
        fullWidth
      >
        <MenuItem value={"Import"} selected={true}>
          Import
        </MenuItem>
        <MenuItem value={"Export"}>Export</MenuItem>
      </Select>
      {JSONAction === "Import" ? (
        <>
          <DialogContentText>Choose your file to import</DialogContentText>
          <input
            type="file"
            accept="application/JSON, plain/text"
            id="JSONFile"
          />
        </>
      ) : (
        <>
          <DialogContentText>Select your DFA to export</DialogContentText>
          <Select
            className={classes.formInput}
            margin="dense"
            id="AFN1"
            defaultValue={NFA1 ? NFA1 : ""}
            onChange={(e) => setNFA1(e.target.value)}
            fullWidth
          >
            <MenuItem value={null}>Select</MenuItem>
            {getDFAs()}
          </Select>
        </>
      )}
    </DialogContent>
  );

  const forms = {
    "Add Basic": (
      <DialogContent>
        <DialogContentText>Enter name and symbol for a NFA</DialogContentText>
        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value.toUpperCase());
          }}
          fullWidth
        />
        <TextField
          className={classes.formInput}
          margin="dense"
          defaultValue={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
          fullWidth
          id="symbol"
          label="Symbol"
        />
      </DialogContent>
    ),
    Join: (
      <DialogContent>
        <DialogContentText>Select 2 NFA to Join them</DialogContentText>
        <InputLabel id="nfa1-label">NFA 1</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          fullWidth
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {Object.keys(automata).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id="nfa2-label">NFA 2</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN2"
          fullWidth
          defaultValue={NFA2 ? NFA2 : ""}
          onChange={(e) => setNFA2(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {Object.keys(automata).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>
    ),
    Concat: (
      <DialogContent>
        <DialogContentText>Select 2 NFAs to concatenate them</DialogContentText>
        <InputLabel id="nfa1-label">NFA 1</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          fullWidth
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {Object.keys(automata).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id="nfa2-label">NFA 2</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN2"
          fullWidth
          defaultValue={NFA2 ? NFA2 : ""}
          onChange={(e) => setNFA2(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {Object.keys(automata).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>
    ),
    "Positive Closure": (
      <DialogContent>
        <DialogContentText>
          Select an NFA to apply Positive Closure
        </DialogContentText>
        <InputLabel id="nfa1-label">NFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          fullWidth
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {Object.keys(automata).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>
    ),
    "Kleene Closure": (
      <DialogContent>
        <DialogContentText>
          Select an NFA to apply Kleene Closure
        </DialogContentText>
        <InputLabel id="nfa1-label">NFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          fullWidth
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {Object.keys(automata).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>
    ),
    "Once or none": (
      <DialogContent>
        <DialogContentText>
          Select an NFA to apply Once or none
        </DialogContentText>
        <InputLabel id="demo-simple-select-label">NFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
          fullWidth
        >
          <MenuItem value={null}>Select</MenuItem>
          {getAutomatas()}
        </Select>
      </DialogContent>
    ),
    "Union for LA": (
      <DialogContent>
        <DialogContentText>
          Select an NFA to apply Union for lexical analyzer
        </DialogContentText>
        <InputLabel id="demo-simple-select-label">NFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          defaultValue={NFA1 ? NFA1 : ""}
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
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
          fullWidth
          id="symbol"
          label="Token"
        />
      </DialogContent>
    ),
    "NFA to DFA": (
      <DialogContent>
        <DialogContentText>
          Select an NFA to convert to DFA and give it a name
        </DialogContentText>
        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value.toUpperCase());
          }}
          fullWidth
        />
        <InputLabel>NFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
          fullWidth
        >
          <MenuItem value={null}>Select</MenuItem>
          {automata["AFNLEX1"] ? (
            <MenuItem key="AFNLEX1" value="AFNLEX1" name="AFNLEX1">
              AFNLEX1
            </MenuItem>
          ) : null}
        </Select>
      </DialogContent>
    ),
    "Analyze string": (
      <DialogContent>
        <DialogContentText>Introduce a string to analyze it</DialogContentText>
        <InputLabel>DFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
          fullWidth
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {getDFAs()}
        </Select>
        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="name"
          label="Analyze string"
          defaultValue={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>
    ),
    "Import / Export": importExportContent,
    "Calculator Eval": (
      <DialogContent>
        <DialogContentText>
          Introduce a math expresion to analyze it
        </DialogContentText>
        <InputLabel>DFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN1"
          defaultValue={NFA1 ? NFA1 : ""}
          onChange={(e) => setNFA1(e.target.value)}
          fullWidth
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {getDFAs()}
        </Select>
        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="expression"
          label="Math expression"
          defaultValue={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>
    ),
    "Regex to NFA": (
      <DialogContent>
        <DialogContentText>
          Introduce a RegEx to convert to NFA and its name
        </DialogContentText>
        <TextField
          className={classes.formInput}
          margin="dense"
          id="name"
          label="Name"
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
        />
        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="expression"
          label="RegEx"
          defaultValue={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>
    ),
    "LL1 Table": (
      <DialogContent>
        <DialogContentText>
          Introduce las gramáticas de la tabla LL1
        </DialogContentText>
        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="expression"
          label="Gramars"
          defaultValue={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
          fullWidth
        />
        <InputLabel id="demo-simple-select-label">Select NFA</InputLabel>
        <Select
          className={classes.formInput}
          margin="dense"
          id="AFN2"
          fullWidth
          label="Select "
          defaultValue={NFA2 ? NFA2 : ""}
          onChange={(e) => setNFA2(e.target.value)}
        >
          <MenuItem value={null} disabled>
            Select
          </MenuItem>
          {getDFAs()}
        </Select>

        <TextField
          className={classes.formInput}
          autoFocus
          margin="dense"
          id="cadena"
          label="String to eval"
          defaultValue={NFA1}
          onChange={(e) => {
            setNFA1(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>
    ),
    "LL1 layout": <div></div>,
  };

  const [selectedForm, setSelectedForm] = React.useState(forms[keyForm]);

  useEffect(() => {
    setSelectedForm(forms[keyForm]);
    function updateForm() {
      forms["Import / Export"] = importExportContent;
    }

    updateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyForm, JSONAction]);

  const handleClose = () => {
    setOpen(false);
    setDialog(null);
  };

  const setLexemesContent = (lex, str) => {
    setSelectedForm(
      <DialogContent>
        <DialogContentText>Generated Lexemes for the {str}</DialogContentText>
        <List className={classes.root}>
          {lex.map((obj, index) => (
            <ListItem button key={index}>
              <ListItemText
                primary={`Lexeme: ${obj.lex}  ->  TOKEN: ${obj.tok}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    );
  };

  const handleForm = async (e) => {
    if (keyForm !== "Analyze string" || lexemesShown) {
      setOpen(false);
      setDialog(null);
    }

    switch (keyForm) {
      case "Add Basic":
        const newAFN = new AFN();
        if (symbol.includes("-") && symbol.split("-").length > 2) {
          var range = symbol.split("-");
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
        onAutomataChange({ ...automata, [NFA1]: dest.opcional() });
        break;
      case "Union for LA":
        if (NFA1 && symbol) {
          if (automata["AFNLEX1"]) {
            const dest = automata["AFNLEX1"];
            dest.UnionEspecialAFNs(automata[NFA1], symbol);
            onAutomataChange({ ...automata, AFNLEX1: dest });
          } else {
            const dest = new AFN();
            dest.UnionEspecialAFNs(automata[NFA1], symbol);
            onAutomataChange({ ...automata, AFNLEX1: dest });
          }

          delete automata[NFA1]; //esta es la madre que deberia borrar el AFN 1 xd
        }
        break;
      case "NFA to DFA":
        if (NFA1 && name) {
          const dest = automata[NFA1];
          const newDFA = dest.ConvAFNaAFD();
          onAutomataChange({ ...automata, [name]: newDFA });
        }
        break;
      case "Analyze string":
        if (symbol) {
          const dest = automata[NFA1];
          const string2Analyze = symbol;
          const analyzer = new AnalizadorLexico(string2Analyze, dest);
          const lex_tokens = [];
          if (analyzer.analisisCadena(lex_tokens)) {
            setLexemesContent(lex_tokens, "valid string");
          } else {
            setLexemesContent(lex_tokens, "invalid string");
          }
          setLexemesShown(true);
        }
        break;
      case "Import / Export":
        if (JSONAction === "Import") {
          const fr = new FileReader();
          const name = document
            .getElementById("JSONFile")
            .files[0].name.split(".")[0];
          fr.onload = function () {
            // eslint-disable-next-line
            if (name === "ascii") {
              let caracteres = fr.result
                .split("")
                .filter(
                  (char) =>
                    char !== " " &&
                    char !== "" &&
                    char !== "\n" &&
                    char !== "\r" &&
                    char !== "\uFFFD" &&
                    char !== "\u007F7" &&
                    char !== "\u007F"
                );
              let edo1 = new AFN();
              edo1.CrearAFNBasico(caracteres[0]);
              caracteres.forEach((sym, index) => {
                if (index !== 0) {
                  let edo2 = new AFN();
                  edo1.UnirAFN(edo2.CrearAFNBasico(sym));
                }
              });
              onAutomataChange({ ...automata, 1: edo1 });
            } else {
              onAutomataChange({
                ...automata,
                [name]: eval("(" + fr.result + ")"),
              });
            }
          };
          fr.readAsText(document.getElementById("JSONFile").files[0]);
        } else {
          const contenidoSerializable = serialize(automata[NFA1]);
          const myblob = new Blob([contenidoSerializable], {
            type: "application/json",
          });

          saveAs(myblob, `${NFA1}.json`);
        }
        break;

      case "Calculator Eval":
        if (NFA1 && symbol) {
          const evaluator = new CalculatorEval(automata[NFA1], symbol);
          const valid = evaluator.initEval();
          const validation = valid ? "valid" : "invalid";
          const result = valid ? `evaluated: ${evaluator.result}` : "";
          alert(
            `${symbol} is a ${validation} math expression! ${result}\nSuffix notation: ${evaluator.suffixExp}`
          );
        }
        break;
      case "Regex to NFA":
        if (symbol && name) {
          const regex2NFA = new Regex2NFA(symbol);
          const valid = regex2NFA.convert();
          if (valid)
            onAutomataChange({
              ...automata,
              [name.toUpperCase()]: regex2NFA.result,
            });
          else alert("REGEX invalid!");
        }
        break;

      case "LL1 Table":
        if (symbol) {
          const gramarOfGramars = new Gramars(symbol);
          const valid = gramarOfGramars.initEval();
          gramarOfGramars.getTerminals();
          if (valid) alert("Check the console!");
          else alert("Invalid Gramars!");
          gramarOfGramars.terminals.add("$");
          forms["LL1 layout"] = (
            <TableLL1
              terminals={Array.from(gramarOfGramars.terminals)}
              noTerminals={Array.from(gramarOfGramars.noTerminals)}
              rulesList={gramarOfGramars.rulesArray}
              ll1={new LL1(gramarOfGramars.rulesArray, gramarOfGramars.noTerminals, gramarOfGramars.terminals)}
              cadena={NFA1}
              AFD={automata[NFA2]}
            />
          );
          onChooseDialog("LL1 layout");
          setDialog(
            <div className={classes.tableLayout}>
              <Dialog
                open={open}
                maxWidth="lg"
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">{"LL1 Table"}</DialogTitle>
                {forms["LL1 layout"] ? forms["LL1 layout"] : null}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }
        break;
      default:
        break;
    }
  };

  return (
    <div id="dialog-container">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{keyForm}</DialogTitle>
        {selectedForm ? selectedForm : null}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleForm}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
