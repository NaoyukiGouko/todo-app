import React from 'react';

function TodoForm(props) {
    return (
        <form onSubmit={props.addTodo} >
            <input type="text" value={props.item} onChange={props.updateItem} />
            <input type="submit" value="登録"/>
        </form>
    );
}

export default TodoForm;