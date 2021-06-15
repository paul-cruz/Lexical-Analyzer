import React, { useState, useEffect } from "react";

import "./index.css";

const TableLL1 = (props) => {
  const { terminals, noTerminals } = props;
  const [tableMatrix, setTableMatrix] = useState([[]]);

  useEffect(() => {
    let table = Array.from(
      Array(terminals.length + noTerminals.length + 1),
      () => new Array(terminals.length + 1)
    );
    let row = noTerminals.length + 1;
    let col = 1;
    for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
      for (let colIndex = 0; colIndex < table[0].length; colIndex++) {
        table[rowIndex][colIndex] = rowIndex !== 0 && colIndex !== 0 ? "Err" : "";
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

    setTableMatrix(table);
    // eslint-disable-next-line
  }, []);

  return (
    <table className="TableLL1">
      {console.table(tableMatrix)}
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
          }
        })}
      </tbody>
    </table>
  );
};

export default TableLL1;
