import React from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
    const todos = props.todos.map(todo => {
        return (
            <TodoItem
                todo={todo}
                checkTodo={props.checkTodo}
                deleteTodo={props.deleteTodo}
            />
        );
    });
    return (
        <ul>
            {props.todos.length ? todos : <li>todoが登録されていません。</li>}
        </ul>
    );
}

export default TodoList;