import React from "react";
import TodoItem from "./todoItem";

class TodoList extends React.Component {
  handleDonefilter = (todo) =>
    this.props.filterSettings.done
      ? this.props.filterSettings.done !== todo.done
      : true;

  handleSeverityfilter = (todo) =>
    this.props.filterSettings.severity.includes(todo.severity);

  handleSearchfilter = (todo) => {
    const { filterSettings } = this.props;

    const titleLower = todo.title.toLowerCase();
    const descriptionLower = todo.description.toLowerCase();

    const titleSearchResult =
      titleLower.includes(filterSettings.searchValue) ||
      filterSettings.searchValue.includes(titleLower);
    const descriptionSearchResult =
      descriptionLower.includes(filterSettings.searchValue) ||
      filterSettings.searchValue.includes(descriptionLower);

    return titleSearchResult || descriptionSearchResult;
  };

  render() {
    const {
      todos,
      onDeleteTodo,
      onUpdateTodo,
      onToggleDoneTodo,
      filterSettings,
    } = this.props;

    let filterTodos = this.handleDonefilter;
    if (filterSettings.searchValue !== "") {
      if (filterSettings.severity.length !== 0) {
        filterTodos = (todo) =>
          this.handleDonefilter(todo) &&
          this.handleSeverityfilter(todo) &&
          this.handleSearchfilter(todo);
      } else {
        filterTodos = (todo) =>
          this.handleDonefilter(todo) && this.handleSearchfilter(todo);
      }
    } else if (filterSettings.severity.length !== 0) {
      filterTodos = (todo) =>
        this.handleDonefilter(todo) && this.handleSeverityfilter(todo);
    }
    const filteredTodos = todos.filter((todo) => filterTodos(todo));
    return (
      <>
        {filteredTodos.length !== 0 ? (
          <ul className="todo__list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodo={onUpdateTodo}
                onToggleDoneTodo={onToggleDoneTodo}
              />
            ))}
          </ul>
        ) : (
          <>
            {todos.length === 0 ? (
              <p>добавьте свое первое todo</p>
            ) : (
              <p>ничего не найдено</p>
            )}
          </>
        )}
      </>
    );
  }
}

export default TodoList;
