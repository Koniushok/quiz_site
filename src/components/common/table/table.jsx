import React, { Component } from "react";
import _ from "lodash";

import { TableDiv, Search, TableItem, TableHead } from "./style";

class Table extends Component {
  state = {
    sort: "",
    reverse: false,
    filter: ""
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ filter: input.value });
  };

  changeFilete = text => {
    this.setState({ filter: text });
  };
  changeSort = nameColumn => {
    if (nameColumn === this.state.sort) {
      this.setState({ reverse: !this.state.reverse });
      return;
    }
    this.setState({ sort: nameColumn, reverse: false });
  };
  convert = items => {
    let data = [];
    if (items)
      items.map(item => {
        data.push(_.toArray(item));
      });

    return data;
  };
  sort = data => {
    if (this.state.sort) {
      data = _.sortBy(data, [this.state.sort]);
      if (this.state.reverse) data = data.reverse();
    }

    return data;
  };
  filter = data => {
    let filter = _.trim(this.state.filter);

    let filter1;
    if (filter) {
      data = _.filter(data, function(items) {
        filter1 = _.filter(items, function(item) {
          return _.trim(item + "").includes(filter);
        });
        return filter1.length !== 0;
      });
    }
    return data;
  };
  render() {
    const { items, headlines } = this.props;
    let keys = [];
    let data = [...items];
    if (!headlines) return null;
    if (items) {
      keys = _.keys(items[0]);
      data = this.filter(data);
      data = this.sort(data);
      data = this.convert(data);
    }
    return (
      <TableDiv>
        <Search>
          <label htmlFor="inputSearch">Search</label>
          <input
            className="form-control"
            id="inputSearch"
            placeholder="search text"
            value={this.state.filter}
            onChange={this.handleChange}
          />
        </Search>

        <table className="table">
          <thead>
            <TableHead>
              {headlines.map((item, i) => {
                return (
                  <th
                    key={item}
                    scope="col"
                    onClick={() => this.changeSort(keys.length > i && keys[i])}
                  >
                    {item}
                    {this.state.sort === keys[i] && !this.state.reverse && ">"}
                    {this.state.sort === keys[i] && this.state.reverse && "<"}
                  </th>
                );
              })}
            </TableHead>
          </thead>
          <tbody>
            {data.map((obj, index) => {
              return (
                <TableItem key={index}>
                  {obj.map((item, i) => {
                    return <td key={i}>{item}</td>;
                  })}
                </TableItem>
              );
            })}
          </tbody>
        </table>
      </TableDiv>
    );
  }
}

export default Table;
