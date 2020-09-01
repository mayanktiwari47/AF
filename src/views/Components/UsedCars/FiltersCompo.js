import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "reactrix-sidebar";
import "reactrix-sidebar/index.css";
import "./style.css";

export default class FiltersCompo extends React.Component {
  render() {
    var options = {
      side: "left",
      effect: "diverge"
    };
    return (
      <Sidebar {...options}>
        <nav>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </nav>
        <div className="content">
          <h1>Page Content</h1>
        </div>
      </Sidebar>
    );
  }
}
