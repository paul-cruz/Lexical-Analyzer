import React, { useState, useEffect } from "react";

import "./index.css";
import AnalizadorLexico from "../../classes/AnalizadorLexico";

const TableLL1 = (props) => {
  const { terminals, noTerminals, rulesList, cadena, AFD } = props;
  const [tableMatrix, setTableMatrix] = useState(null);
  const [isAccepted, setIsAccepted] = useState("");
  const mapeoTokens = {
    70: "NUM",
    10: "MAS",
    20: "MENOS",
    30: "POR",
    40: "ENTRE",
    50: "PAR_I",
    60: "PAR_D",
  };

  const [termilesNuevo, setTerminalesNuevo] = useState(
    terminals.filter((item) => item !== "EPSILON")
  );
  function initEmptyTable() {
    let table = Array.from(
      Array(termilesNuevo.length + noTerminals.length + 1),
      () => new Array(termilesNuevo.length + 1)
    );
    let row = noTerminals.length + 1;
    let col = 1;
    for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
      for (let colIndex = 0; colIndex < table[0].length; colIndex++) {
        table[rowIndex][colIndex] =
          rowIndex !== 0 && colIndex !== 0 ? "Err" : "";
      }
    }

    termilesNuevo.forEach((symbol, index) => {
      table[0][index + 1] = symbol;
    });

    noTerminals.concat(termilesNuevo).forEach((symbol, index) => {
      table[index + 1][0] = symbol;
    });

    for (let index = 0; index < termilesNuevo.length; index++) {
      table[row][col] = index + 1 < termilesNuevo.length ? "POP" : "ACCEPT";
      row += 1;
      col += 1;
    }
    return table;
  }

  function searchSymbolCoord(symbol, table) {
    //Searching for non terminal symbols in rows
    for (let row = 1; row < table.length - termilesNuevo.length; row++) {
      if (table[row][0] === symbol) {
        return ["row", row];
      }
    }

    //Searching for terminal symbols in columns
    for (let col = 1; col < table[0].length; col++) {
      if (table[0][col] === symbol) {
        return ["col", col];
      }
    }

    return false; //No existe el elemento, posiblemente epsilon
  }

  function initDataTable(table) {
    let ll1 = props.ll1;
    rulesList.forEach((rule, index) => {
      rule = rule.toList();
      let reglaString = rule.slice(1).join(" ");
      //First
      ll1.first(rule, 1).forEach((symbol) => {
        if (symbol !== "EPSILON") {
          let fila = searchSymbolCoord(rule[0], table)[1];
          let columna = searchSymbolCoord(symbol, table)[1];
          table[fila][columna] = reglaString; //+","+(index+1);
        } else {
          //follow
          ll1.follow(rule[0]).forEach((newSymbol) => {
            let fila = searchSymbolCoord(rule[0], table)[1];
            let columna = searchSymbolCoord(newSymbol, table)[1];
            table[fila][columna] = reglaString; //+","+(index+1);
          });
        }
      });
    });

    return table;
  }

  useEffect(() => {
    setTerminalesNuevo(terminals.filter((item) => item !== "EPSILON"));
    let table = initEmptyTable();
    table = initDataTable(table);
    setTableMatrix(table);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tableMatrix !== null) {
      let lexemes = getLexemes();
      let isValid = analizeString(lexemes);
      if (isValid) {
        setIsAccepted(true);
      }
    }
    // eslint-disable-next-line
  }, [tableMatrix]);

  function getLexemes() {
    let AL = new AnalizadorLexico(cadena, AFD);
    let lexCadenas = [];
    AL.analisisCadena(lexCadenas);
    let analysedString = "";
    lexCadenas.forEach((lexeme) => {
      analysedString += mapeoTokens[lexeme.tok] + " ";
    });

    return analysedString;
  }

  function analizeString(lexemes) {
    lexemes = lexemes.split(" ");
    lexemes.push("$");
    lexemes = lexemes.filter((item) => item !== "");

    return threeColsTableAnalysis(lexemes);
  }

  function threeColsTableAnalysis(lexemes) {
    let stack = [rulesList[0].head.symbol];
    let lexemeIndex = 0;
    while (true) {
      console.log(stack);
      if (stack.length < 1) {
        //Cadena aceptada
        return true;
      }
      let lexeme = lexemes[lexemeIndex];
      let topStack = stack.pop();
      if (topStack === lexeme) {
        lexemeIndex++;
        continue;
      }
      let row = searchSymbolCoord(topStack, tableMatrix)[1];
      let col = searchSymbolCoord(lexeme, tableMatrix)[1];
      let accion = "";
      if (!row || !col) return false; //No se encuentra en la tabla LL1
      accion = tableMatrix[row][col].split(",")[0];
      if (accion.split(" ")[0] === lexeme) {
        lexemeIndex += 1;
        stack.push(...accion.split(" ").slice(1).reverse());
        continue;
      }

      if (accion === "EPSILON") {
        continue;
      }

      stack.push(...accion.split(" ").reverse());
    }
  }

  return (
    <>
      <h3 className="string">
        The string: <code>{cadena}</code>
        <br /> {isAccepted ? "Is valid!" : "Is not valid!"}{" "}
      </h3>
      <table className="TableLL1">
        <thead>
          <tr className="col">
            {tableMatrix &&
              tableMatrix[0].map((symbol, index) => (
                <td key={index}>{symbol}</td>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableMatrix &&
            tableMatrix.map((row, index) => {
              if (index !== 0) {
                return (
                  <tr key={index + "-row"}>
                    {row.map((symbolRow, indexRow) => (
                      <td
                        key={indexRow}
                        className={symbolRow === "Err" ? "error" : ""}
                      >
                        {symbolRow}
                      </td>
                    ))}
                  </tr>
                );
              } else {
                return null;
              }
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableLL1;
