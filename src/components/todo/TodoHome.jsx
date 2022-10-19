import React, { useState } from 'react';
import InputBox from './InputBox';
import ToDoItemList from './ToDoItemList';
import '../../css/Todo.css';

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  return (
    <div className="homepage__container">
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox todoList={todoList} setTodoList={setTodoList} />

      {/* 할 일 Item 리스트 */}
      <ToDoItemList
        title={'Todo'}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false}
      />

      {/* 완료한 Item 리스트 */}
      <ToDoItemList
        title={'Done'}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true}
      />
    </div>
  );
};

export default Home;
