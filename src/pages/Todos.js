import React, { useState } from "react";
import InputBox from "../components/Todos/InputBox";
import "../components/css/Todo.css";
import ToDoItemList from "../components/Todos/ToDoItemList";

const Todos = () => {
  const [todoList, setTodoList] = useState([]); //todoList 배열

  return (
    <div className="homepage__container">
      <h1>Todo List</h1>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox todoList={todoList} setTodoList={setTodoList} />

      {/* 할 일 Item 리스트 */}
      <ToDoItemList
        title={"Todo"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false}
      />

      {/* 완료한 Item 리스트 */}
      <ToDoItemList
        title={"Done"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true}
      />
    </div>
  );
};

export default Todos;
