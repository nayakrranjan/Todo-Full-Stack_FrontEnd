import Header from './Header';
import { useEffect, useState } from 'react';
import { deleteTodo, getTodosByUser } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    function refreshTodos() {
        getTodosByUser(username)
            .then (
                response => {
                    setTodos(response?.data);
                }
            )
            .catch (
                error => console.log(error)
            )
    }

    useEffect(
        refreshTodos, [username]
    )

    const handelAddTodo = function() {
        navigate(`/todo/-1`)
    }

    return (
        <div className='container-lg'>
            <Header username={username} />
            <h3 className='my-tds'>
                My Todos:
            </h3>
            {message && <div className="alert alert-warning">{message}</div>}
            <div className="container mt-4">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>TASK</th>
                                <th>STATUS</th>
                                <th>TARGET DATE</th>
                                <th>UPDATE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map(todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.task}</td>
                                        <td>
                                            <input type="checkbox" checked={todo.status} readOnly />
                                        </td>
                                        <td>{todo.targetDate?.toString()}</td>
                                        <td>
                                            <button type="button" className="btn btn-success" onClick={
                                                function() {
                                                    console.log(todo.id);
                                                    navigate(`/todo/${todo.id}`)
                                                }
                                            }>< BsPencilSquare />
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={
                                                function() {
                                                    console.log(todo.id);
                                                    deleteTodo(username, todo.id)
                                                        .then(
                                                            function() {
                                                                setMessage('Deleted Successfully')
                                                                refreshTodos()
                                                            }
                                                        )
                                                }
                                            }><BsTrash3 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="btn btn-primary mt-3 ps-3 pe-3 rounded-pill" onClick={handelAddTodo}>Add Todo</div>
                </div>
            </div>
        </div>
    )
}

export default Home