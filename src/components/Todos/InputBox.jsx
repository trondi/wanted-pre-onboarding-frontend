import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const InputBox = ({ todoList, setTodoList }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  //input 값 가져오기
  const onChangeInput = (e) => {
    setTodo(e.target.value);
  };

  const onClickAddButton = () => {
    //todoItemList 에 값 추가
    const nextTodoList = todoList.concat({
      id: todoList.length,
      todo,
      isCompleted: false,
      deleted: false, //삭제 Flag 값
    });
    setTodoList(nextTodoList);

    setTodo(""); // input 값을 초기화
    inputRef.current.focus(); // input으로 포커싱
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickAddButton(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  useEffect(() => {
    //todoList가 변했을 때만 실행
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="todoapp__inputbox">
      {/* 아이템 내용 입력 input */}
      <input
        type="text"
        name="todoItem"
        value={todo}
        ref={inputRef}
        placeholder="할 일을 입력해주세요"
        className="todoapp__inputbox-inp"
        onChange={onChangeInput}
        onKeyDown={handleOnKeyPress}
      />
      {/* 입력 후 아이템 추가 버튼 */}
      <button
        type="submit"
        className="todoapp__inputbox-add-btn"
        onClick={onClickAddButton}
      >
        추가
      </button>
    </div>
  );
};

//Props 값 검증
InputBox.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
    }).isRequired
  ),
  setTodoList: PropTypes.func.isRequired,
};

export default InputBox;
