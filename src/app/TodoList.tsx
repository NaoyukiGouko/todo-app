import React from 'react';
import TodoItem from './TodoItem';
import { FC } from 'react';
import Todo from './Todo';


const TodoList: FC<TodoListProps> = (props) => {
    const today = new Date();
    const todos = props.todos.map(todo => {
        return (
            <TodoItem
                todo={todo}
                todos={props.todos}
                setTodos={props.setTodos}
                checkTodo={props.checkTodo}
                deleteTodo={props.deleteTodo}
                isShowAll={props.isShowAll}
                setIsShowAll={props.setIsShowAll}
                today={today}
            />
        );
    });

    return (
        <ul>
            {props.todos.length ? todos : <li>todoが登録されていません。</li>}
        </ul>
    );
}

type TodoListProps = {
    todos: Todo[]
    checkTodo: any
    deleteTodo: any
    setTodos: React.Dispatch<React.SetStateAction<any[]>>
    isShowAll: boolean;
    setIsShowAll: React.Dispatch<React.SetStateAction<boolean>>
}

export default TodoList;