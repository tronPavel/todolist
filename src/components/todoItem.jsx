import React from "react";

class TodoItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { todo, onDeleteTodo, onUpdateTodo, onToggleDoneTodo } = this.props;

    return (
      <li className={todo.done ? "todo active" : "todo"}>
        <div className="todo__header">
          <div>
            <input
              className="todo__input"
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggleDoneTodo(todo.id)}
            />
            <h3>{todo.title}</h3>
          </div>
          <p>{todo.createdTime}</p>
        </div>
        <div className="todo__body">
          <div className="todo__text">
            <p>{todo.description}</p>
            <div className="todo__severity">
              <p>{todo.severity}</p>
            </div>
          </div>

          <div className="todo__btn_container">
            <button
              type="button"
              className="todo__btn"
              onClick={() => onDeleteTodo(todo.id)}
            >
              удалить
            </button>
            <button
              type="button"
              className="todo__btn"
              onClick={() => onUpdateTodo(todo)}
            >
              изменить
            </button>
          </div>
        </div>
      </li>
    );
  }
}
export default TodoItem;
