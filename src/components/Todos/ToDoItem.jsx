import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
  const [edited, setEdited] = useState(false); //수정모드 플래그 값
  const [newTodo, setNewTodo] = useState(todoItem.todo); //새로운 아이템 내용

  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      // id 값이 같은 항목의 checked 값을 Toggle 함
      isCompleted:
        item.id === todoItem.id ? !item.isCompleted : item.isCompleted,
    }));
    setTodoList(nextTodoList);
  };

  const onClickEditButton = () => {
    //수정모드로 변경
    // 클릭 시 edited 값을 true 로 바꿈
    setEdited(true);
  };
  const onClickCancelButton = () => {
    setEdited(false);
    setNewTodo(todoList.item.todo);
  };

  const onChangeEditInput = (e) => {
    //수정 Input 변화 감지
    setNewTodo(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      todo: item.id === todoItem.id ? newTodo : item.todo, //새로운 아이템 내용을 넣어줌
    }));
    setTodoList(nextTodoList); //새로운 리스트를 넣어줌

    setEdited(false); //수정모드 > 읽기모드
  };

  const onClickDeleteButton = () => {
    //Delete
    if (window.confirm("Delete it?")) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        deleted: item.id === todoItem.id ? true : item.deleted,
      }));
      setTodoList(nextTodoList);
    }
  };

  return (
    <li className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}

      <input
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.isCompleted}
        onChange={onChangeCheckbox}
      />

      {
        // item 내용
        edited ? ( //수정모드
          <input
            type="text"
            className="todoapp__item-edit-input"
            value={newTodo}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
        ) : (
          //읽기모드
          <span
            className={`todoapp__item-ctx ${
              todoItem.isCompleted ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todoItem.todo}
          </span>
        )
      }

      {
        // 수정 버튼
        //완료된 일인 경우에는 null을 반환하여 보이지 않도록 함
        !todoItem.isCompleted ? (
          edited ? (
            <>
              <button
                type="button"
                className="todoapp__item-edit-btn"
                onClick={onClickSubmitButton}
              >
                Save
              </button>
              <button
                type="button"
                className="todoapp__item-cancel-btn"
                onClick={onClickCancelButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="todoapp__item-edit-btn"
                onClick={onClickEditButton}
              >
                Edit
              </button>
              {/* 삭제 버튼 */}
              <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={onClickDeleteButton}
              >
                Del
              </button>
            </>
          )
        ) : null
      }
    </li>
  );
};

ToDoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    todo: PropTypes.string.isRequired,
  }),
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;
