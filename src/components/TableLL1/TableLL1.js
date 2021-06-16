import React, { useState, useEffect } from "react";

import "./index.css";
import LL1 from "../../classes/LL1";

const TableLL1 = (props) => {
  const { terminals, noTerminals, rulesList } = props;
  const [tableMatrix, setTableMatrix] = useState([[]]);
  console.log(props);
  function initEmptyTable(){
    let table = Array.from(
      Array(terminals.length + noTerminals.length + 1),
      () => new Array(terminals.length + 1)
    );
    let row = noTerminals.length + 1;
    let col = 1;
    for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
      for (let colIndex = 0; colIndex < table[0].length; colIndex++) {
        table[rowIndex][colIndex] =
          rowIndex !== 0 && colIndex !== 0 ? "Err" : "";
      }
    }

    terminals.forEach((symbol, index) => {
      table[0][index + 1] = symbol;
    });

    noTerminals.concat(terminals).forEach((symbol, index) => {
      table[index + 1][0] = symbol;
    });

    for (let index = 0; index < terminals.length; index++) {
      table[row][col] = index + 1 < terminals.length ? "POP" : "ACCEPT";
      row += 1;
      col += 1;
    }
    return table;
  }

  function searchSymbolCoord(symbol, table){
      //Searching for non terminal symbols in rows
    for(let row = 1 ; row < table.length - terminals.length ; row++){
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
    let ll1 = new LL1(rulesList, noTerminals, terminals);
    rulesList.forEach(rule => {
      rule = rule.toList();
      console.log(rule.slice(1).join(""));
      //First

      let firstSet = new Set();
      if(firstSet.has("EPSILON")){
        //Follow
      }
    });

    return table;
  }

  useEffect(() => { 
    
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
