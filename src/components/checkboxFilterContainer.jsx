import React from "react";
import CheckboxFilter from "./checkboxFilter";
class CheckboxFilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      severity: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onUpdateState(this.state);
    }
  }

  handleToggleFilterSingleInput = (name, value) => {
    this.setState((prevState) => ({ [name]: !prevState[name] }));
  };
  handleToggleFilterGroupInputs = (name, value) => {
    this.setState((prevState) => {
      const newSettings = prevState[name].includes(value)
        ? prevState[name].filter((el) => el !== value)
        : [...prevState[name], value];
      return { [name]: newSettings };
    });
  };
  handleGetUniqValuesForFilters = (todos, field) => {
    const uniqueValues = [...new Set(todos.map((todo) => todo[field]))];
    return uniqueValues;
  };

  render() {
    const { todos } = this.props;
    const severities = this.handleGetUniqValuesForFilters(todos, "severity");
    const uniqDoneValues = this.handleGetUniqValuesForFilters(todos, "done");

    return (
      <>
        {uniqDoneValues.length > 1 && (
          <CheckboxFilter
            filterValue={false}
            filterName={"done"}
            onToggleFilterInput={this.handleToggleFilterSingleInput}
          >
            Скрыть выполненные
          </CheckboxFilter>
        )}

        {severities.length > 1 && (
          <>
            <p>важность</p>
            {severities.map((severity) => (
              <CheckboxFilter
                key={severity}
                filterValue={severity}
                filterName={"severity"}
                onToggleFilterInput={this.handleToggleFilterGroupInputs}
              >
                {severity}
              </CheckboxFilter>
            ))}
          </>
        )}
      </>
    );
  }
}
export default CheckboxFilterContainer;
