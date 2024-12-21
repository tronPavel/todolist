import React from "react";

class CheckboxFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children, onToggleFilterInput, filterValue, filterName } =
      this.props;
    return (
      <label className="filter__label">
        <input
          onChange={() => onToggleFilterInput(filterName, filterValue)}
          type="checkbox"
          value={filterValue}
          name={filterName}
        />
        {children}
      </label>
    );
  }
}
export default CheckboxFilter;
