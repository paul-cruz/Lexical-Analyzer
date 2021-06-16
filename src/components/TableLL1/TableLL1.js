import React, { useState, useEffect } from "react";

import "./index.css";
import LL1 from "../../classes/LL1";

const TableLL1 = (props) => {
  const { terminals, noTerminals, rulesList, cadena } = props;
  const [tableMatrix, setTableMatrix] = useState([[]]);
  console.log(props);
  const [termilesNuevo, setTerminalesNuevo] = useState(terminals.filter(item => item !== "EPSILON"));
  function initEmptyTable(){
    let table = Array.from(
      Array(termilesNuevo.length + noTerminals.length + 1 ),
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

  function searchSymbolCoord(symbol, table){
      //Searching for non terminal symbols in rows
    for(let row = 1 ; row < table.length - termilesNuevo.length ; row++){
      if(table[row][0] === symbol){
        return ["row", row];
      }
    }

      //Searching for terminal symbols in columns
    for(let col = 1 ; col < table[0].length ; col++){
      if(table[0][col] === symbol){
        return ["col", col];
      }
    }

    return false; //No existe el elemento, posiblemente epsilon
  }

  function initDataTable(table){
    let ll1 = props.ll1;
    rulesList.forEach((rule, index) => {
      rule = rule.toList();
      let reglaString = rule.slice(1).join("");
      //First
      ll1.first(rule, 1).forEach(symbol => {
        if(symbol !== "EPSILON"){
          let fila = searchSymbolCoord(rule[0], table)[1];
          let columna = searchSymbolCoord(symbol, table)[1];
          table[fila][columna] = reglaString+","+(index+1);
        } else {
          ll1.follow(rule[0]).forEach(newSymbol => {
            let fila = searchSymbolCoord(rule[0], table)[1];
            let columna = searchSymbolCoord(newSymbol, table)[1];
            table[fila][columna] = reglaString+","+(index+1);
          });
        }
      });
      let firstSet = new Set();
      if(firstSet.has("EPSILON")){
        //Follow
      }
    });

    return table;
  }

  useEffect(() => { 
    setTerminalesNuevo(terminals.filter(item => item !== "EPSILON"));
    let table = initEmptyTable();
    table = initDataTable(table);
    setTableMatrix(table);
    // eslint-disable-next-line
  }, []);

  return (
    <table className="TableLL1">
      <thead>
        <tr className="col">
          {tableMatrix[0].map((symbol, index) => (
            <td key={index}>{symbol}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableMatrix.map((row, index) => {
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
  );
};

export default TableLL1;
