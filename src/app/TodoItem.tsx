import React from 'react';
import Todo from './Todo';
import { FC } from 'react';

const TodoItem: FC<TodoItemProps> = (props) => {
    let isLimit: string = '';
    if(Date.parse(props.todo.limit) < Date.parse(props.today.toDateString())) {
        isLimit = 'isLimit';
    }
    return (
        props.isShowAll || !props.todo.isDone ?
        <li key={props.todo.id}  className = {isLimit}>
            <label>
                <input type="checkbox"
                checked={props.todo.isDone}
                onChange={() => props.checkTodo(props.todo, props.todos, props.setTodos)} 
                />
                <button className="button" onClick={() => props.deleteTodo(props.todo, props.setTodos)}>削除</button>
                <span className="todo-item">
                    {props.todo.title}
                </span>
                <span className="limit">
                    {props.todo.limit ? '期限：' + props.todo.limit : '期限：なし'}
                </span>
            </label>
        </li>
        : null
    );
}

type TodoItemProps = {
    todo: Todo
    todos: Todo[]
    setTodos: any
    checkTodo: any
    deleteTodo: any
    isShowAll: boolean
    setIsShowAll: any
    today: string
}


export default TodoItem;