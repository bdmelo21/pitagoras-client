import React, { Component } from "react";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
class SearchBar extends Component {
  state = {
    searchQuery: "",
  };
  handleonChange = (event) => {
    let { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };
  render() {
    return (
      <div class="parent-panel-block">
        <div class="panel-block">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Search for Subjects"
              name="searchQuery"
              value={this.state.searchQuery}
              onChange={this.handleonChange}
            />
            <span class="icon is-left">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default SearchBar;
