import { v4 as uuidv4 } from "uuid";

export const genereteTodos = (n) => {
  const todos = [];
  for (let i = 0; i < n; i++) {
    todos.push(generateTodo());
  }
  return todos;
};

const generateTodo = () => ({
  done: Math.random() > 0.5,
  title: getRandomString(),
  description: getRandomString(),
  id: uuidv4(),
  severity: getRandomSeverity(),
});

const getRandomString = () => Math.random().toString(36).substring(2);
const getRandomSeverity = () => {
  const values = ["срочно", "средне", "не срочно"];
  const randomValue = values[Math.floor(Math.random() * values.length)];
  return randomValue;
};
