import React from "react";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import CheckboxFilterContainer from "./components/checkboxFilterContainer";
import SearchInput from "./components/searchInput";
import { genereteTodos } from "./utils/generate-todos";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

/*Приложение оптимизировано для работы с большим списком задач
Приложение адаптивно под все размеры экранов;
Задачу можно редактировать;
Не показывать фильтр, если для него нет значений, например, если
все задачи одной и той же важности, не показывать фильтр на одно
значение */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      editedTodo: null,
      filterSettings: {
        done: false,
        severity: [],
        searchValue: "",
      },
    };
  }
  handleUpdatefilterSettings = (updatedState) => {
    this.setState((prevState) => ({
      filterSettings: {
        ...prevState.filterSettings,
        ...updatedState,
      },
    }));
  };

  handleSaveTodo = (title, description, severity) => {
    let newTodo = {
      done: false,
      title,
      description,
      severity,
    };
    const { editedTodo } = this.state;
    if (editedTodo) {
      const updatedTodos = this.state.todos.map((todo) =>
        todo.id === editedTodo.id ? { ...todo, ...newTodo } : todo
      );
      this.setState({ todos: updatedTodos });
    } else {
      newTodo = {
        id: uuidv4(),
        createdTime: new Date().toLocaleString(),
        isChecked: false,
        ...newTodo,
      };
      this.setState({ todos: [...this.state.todos, newTodo] });
    }
  };

  handleDeleteTodo = (id) => {
    this.setState({ todos: this.state.todos.filter((todo) => todo.id !== id) });
  };
  handleUpdateTodo = (todo) => {
    this.setState({ editedTodo: todo });
  };
  handleToggleDoneTodo = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  handleGenereteTodos = () => {
    const newTodos = genereteTodos(100);
    this.setState({ todos: [...this.state.todos, ...newTodos] });
  };

  render() {
    const { editedTodo, todos, filterSettings } = this.state;
    return (
      <>
        <div className="container">
          <aside>
            <h1>Todolist</h1>
            <CheckboxFilterContainer
              onUpdateState={this.handleUpdatefilterSettings}
              todos={todos}
            />
          </aside>
          <div className="content">
            <SearchInput onUpdateState={this.handleUpdatefilterSettings} />
            <TodoList
              todos={todos}
              filterSettings={filterSettings}
              onDeleteTodo={this.handleDeleteTodo}
              onUpdateTodo={this.handleUpdateTodo}
              onToggleDoneTodo={this.handleToggleDoneTodo}
            />
          </div>
        </div>
        <TodoForm onSaveTodo={this.handleSaveTodo} editedTodo={editedTodo} />
        <button type="button" onClick={() => this.handleGenereteTodos(1000)}>
          Создать 100 todo
        </button>
      </>
    );
  }
}

export default App;
