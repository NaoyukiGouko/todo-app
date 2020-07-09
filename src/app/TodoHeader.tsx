import React from 'react';

const TodoHeader = (props) => {
    const remaining = props.todos.filter(todo => {
        return !todo.isDone;
    });

    return (
        <h1>
            My todos
            <span>
                ({remaining.length}/{props.todos.length})
            </span>
        </h1>

    );
}

export default TodoHeader;