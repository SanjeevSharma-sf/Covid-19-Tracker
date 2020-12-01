import React from "react";
import "./TableIndia.css";
import numeral from "numeral";

function TableIndia({ indiaData }) {
  return (
    <div className="tableIndia">
    <table>
      <tr>
        <th colspan="1"><strong>States</strong></th>
        <th colspan="1"><strong>Cases</strong></th>
        <th colspan="1"><strong>Recovered</strong></th>
        <th colspan="1"><strong>Deaths</strong></th>
        <th colspan="1"><strong>Active Cases</strong></th>
      </tr>

      {indiaData.map(({ state, cases, recovered, deaths, active }) => (
        // <table>

        <tr>
          <td className="tableIndia__state">{state}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
          <td>
            <strong>{numeral(recovered).format("0,0")}</strong>
          </td>
          <td>
            <strong>{numeral(deaths).format("0,0")}</strong>
          </td>
          <td>
            <strong>{numeral(active).format("0,0")}</strong>
          </td>
        </tr>
        
        //  </table>
      ))}
      </table>
    </div>
  );
}

export default TableIndia;
