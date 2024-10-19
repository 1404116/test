import React from "react";
import TodoItem from "./TodoItem";

// property로 부모 함수로부터 자식 함수로 데이터를 전달해야 한다.
// 상속관계 props
const TodoBoard = ({ todoList, deleteTask, updateTask }) => {
    return (
        <div>
            <h2>Todo List</h2>
            {todoList.length > 0 ? (
                todoList.map((item) => (
                    <TodoItem
                        //key는 리스트 랜더링 시 각 요소에 고유한 식별자를 제공하기 위한 속성
                        key={item._id} // mongoDB에서 데이터를 받아오기 때문에 _id 필드명을 사용
                        item={item}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                ))
            ) : (
                <h2>There is no Item to show</h2>
            )}
            {/* <TodoItem/> will be here once we get the todoList */}
        </div>
    );
};

export default TodoBoard;
