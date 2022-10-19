import React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./ToDoItem";

const ToDoItemList = ({ title, todoList, setTodoList, checkedList }) => (
  <div className="todoapp__list">
    {/*props로 부터 title 값을 전달 받음*/}
    <p className="todoapp__list-tit">{title}</p>

    <ul className="todoapp__list-ul">
      {todoList && // todoList가 있을 때만 출력(if)
        todoList.map((todoItem) => {
          // 삭제한 항목인 경우, 출력하지 않음(deleted : true)
          if (todoItem.deleted) return null;

          //checkedList 값에 따라 '할일 목록' 또는 '완료된 목록' 출력
          if (checkedList !== todoItem.isCompleted) return null;

          return (
            //map 을 이용하여 ToDoItem을 출력
            <ToDoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          );
        })}
    </ul>
  </div>
);

ToDoItemList.propTypes = {
  title: PropTypes.string.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
  checkedList: PropTypes.bool.isRequired,
};

export default ToDoItemList;
