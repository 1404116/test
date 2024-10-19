import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");

    const getTasks = async () => {
        const response = await api.get("/tasks");
        console.log("rrr", response);
        setTodoList(response.data.data);
    };
    const addTask = async () => {
        try {
            const response = await api.post("/tasks", {
                task: todoValue,
                isComplete: false,
            });
            if (response.status === 200) {
                console.log("success");
                //1. 입력한 값이 안사라짐
                setTodoValue("");
                //2. 추가한 값이 안보임
                getTasks();
            } else {
                throw new Error("task can not be added");
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    // const deleteTask = async (id) => {
    //     try {
    //         const response = await api.delete("/tasks/:id");
    //     } catch (err) {}
    // };
    // 콜론은 백엔드에서 값을 전달할 때 사용 프론트엔드에서는 템플릿 사용으로 데이터를 주고 받음

    const deleteTask = async (id) => {
        try {
            // `` 백틱을 사용하여야 템플릿 리터럴이 활성화 시킬 수 있고 변수를 문자열에 삽입가능
            // 이 경우 동적으로 값이 대체 따옴표의 경우 순수 문자열 그대로 취급
            // 때문에 템플릿이 작동하지 않음
            const response = await api.delete(`/tasks/${id}`); // id 기반으로 삭제
            if (response.status === 200) {
                console.log("success");
                getTasks(); // 삭제 후 목록 새로고침
            } else {
                throw new Error("fail");
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    const updateTask = async (id, itemComplete) => {
        try {
            const response = await api.put(`/tasks/complete/${id}`);
            console.log("success");
            getTasks();
            console.log(itemComplete);
        } catch (err) {
            console.log("error", err);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={todoValue}
                        onChange={(event) => setTodoValue(event.target.value)}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={addTask}>
                        추가
                    </button>
                </Col>
            </Row>

            <TodoBoard
                todoList={todoList}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
        </Container>
    );
}

export default App;
