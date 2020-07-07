import React from 'react';
import Todo from './Todo';

function TodoItem(props){
    return (
        <li key={props.todo.id}>
            <label>
                <input type="checkbox"
                checked={props.todo.isDone}
                onChange={() => props.checkTodo(props.todo)} 
                />
                <button className="button" onClick={() => props.deleteTodo(props.todo)}>削除</button>
                <span className="todo-item">
                    {props.todo.title}
                </span>
            </label>
            
            
        </li>
    );
}

export default TodoItem;