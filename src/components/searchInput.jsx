import React from "react";
class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }
  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
    let debounce;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      this.props.onUpdateState({
        searchValue: this.state.searchValue.toLowerCase(),
      });
    }, 800);
  };
  render() {
    return (
      <input
        className="search"
        type="text"
        value={this.state.searchValue}
        onChange={this.handleChange}
      />
    );
  }
}
export default SearchInput;
