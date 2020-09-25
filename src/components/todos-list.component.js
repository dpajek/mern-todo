import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

class Todo extends React.Component {

  /*
  deleteTodo(id) {
    console.log(id);
    axios.delete("http://localhost:4000/todos/" + id).then((res) => {
      console.log(res.data);
      //this.props.history.push("/");
    });
  }
  */

  render() {
    return (
      <tr>
        <td className={this.props.todo.todo_completed ? "completed" : ""}>
          {this.props.todo.todo_description}
        </td>
        <td className={this.props.todo.todo_completed ? "completed" : ""}>
          {this.props.todo.todo_responsible}
        </td>
        <td className={this.props.todo.todo_completed ? "completed" : ""}>
          {this.props.todo.todo_priority}
        </td>
        <td>
          <Link to={"/edit/" + this.props.todo._id}>Edit</Link>
        </td>
        <td>
          <Link to="" onClick={() => this.props.onClick(this.props.todo._id)}>Delete</Link>
        </td>
      </tr>
    );
  }
}

export default class TodosList extends React.Component {
  constructor(props) {
    super(props);

    //this.todoList = this.todoList.bind(this);

    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map(function (currentTodo, i) {
      return <Todo todo={currentTodo} onClick={(i) => this.deleteTodo(i)} key={i} />;
    },this);
  }

  deleteTodo(id) {
    console.log(id);
    axios.delete("http://localhost:4000/todos/" + id).then((res) => {
      console.log(res.data);

      axios
      .get("http://localhost:4000/todos/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
