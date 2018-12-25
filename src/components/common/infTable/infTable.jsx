import React, { Component } from "react";
import { Table } from "./style";

class InfTable extends Component {
  render() {
    const { obj } = this.props;
    if (!obj) return null;
    let items = [];
    for (let key in obj) {
      items.push({ name: key, value: obj[key] });
    }
    return (
      <Table className="table">
        <tbody>
          {items &&
            items.map(item => {
              return (
                <tr key={item.name}>
                  <th>{item.name}</th>
                  <td>{item.value}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default InfTable;
