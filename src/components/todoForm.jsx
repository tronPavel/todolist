import React from "react";
class TodoForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      severity: "средне",
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editedTodo !== this.props.editedTodo) {
      this.setState({
        title: this.props.editedTodo ? this.props.editedTodo.title : "",
        description: this.props.editedTodo
          ? this.props.editedTodo.description
          : "",
        severity: this.props.editedTodo
          ? this.props.editedTodo.severity
          : "средне",
      });
    }
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCreateTodo = () => {
    if (this.state.title.trim() !== "" && this.state.severity !== "") {
      this.props.onSaveTodo(
        this.state.title,
        this.state.description,
        this.state.severity
      );
      this.setState({ title: "", description: "", severity: "средне" });
    }
  };
  render() {
    const { title, description, severity } = this.state;
    return (
      <form className="todo__form">
        <h2>Добавить задачу</h2>
        <div>
          <div className="form__item">
            <label className="form__label">название </label>
            <input
              className="text__input"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              placeholder="Введите название задачи"
            />
          </div>
          <div className="form__item">
            <label className="form__label">описание </label>
            <textarea
              className="text__input"
              name="description"
              value={description}
              onChange={this.handleInputChange}
              placeholder="Введите описание задачи"
            />
          </div>
          <div className="form__item">
            <label className="form__label">Важность</label>
            <div className="checkbox__input_container">
              <input
                className="checkbox__input"
                onChange={this.handleInputChange}
                type="radio"
                name="severity"
                value="средне"
                checked={severity === "средне"}
                id="medium"
              />
              <label htmlFor="medium" className="checkbox__label form__label">
                средне
              </label>
              <input
                className="checkbox__input"
                onChange={this.handleInputChange}
                type="radio"
                name="severity"
                value="срочно"
                checked={severity === "срочно"}
                id="urgently"
              />
              <label htmlFor="urgently" className="checkbox__label form__label">
                срочно
              </label>
              <input
                className="checkbox__input"
                onChange={this.handleInputChange}
                type="radio"
                name="severity"
                value="не срочно"
                checked={severity === "не срочно"}
                id="nourgently"
              />
              <label
                htmlFor="nourgently"
                className="checkbox__label form__label"
              >
                не срочно
              </label>
            </div>
          </div>
        </div>
        <button type="button" onClick={this.handleCreateTodo}>
          Сохранить
        </button>
      </form>
    );
  }
}
export default TodoForm;
