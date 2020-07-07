import React from 'react';
import Todo from './Todo';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import fetch from 'isomorphic-unfetch';

interface ITodoContainer {
    todos: Todo[];　//登録されているtodo
    item: string; //フォームに入力されているテキスト
    isLoading: boolean //アクセス時非同期関数のsetStateまでtrueとしロード画面を表示
}

class TodoContainer extends React.Component<any, ITodoContainer> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: props.todos,
            item: '',
            isLoading: true
        };
        this.checkTodo = this.checkTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.getTodoList = this.getTodoList.bind(this);
        //this.fetchApi = this.fetchApi.bind(this);
    }

    //チェックボックスのチェック処理
    checkTodo(todo: Todo) :void{
        const todos = this.state.todos.map(todo => {
            return {id: todo.id, title: todo.title, isDone: todo.isDone};
        });

        const pos = this.state.todos.map(todo => {
            return todo.id;
        }).indexOf(todo.id);

        todos[pos].isDone = !todos[pos].isDone;
        this.setState ({
            todos: todos
        });
    }

    //todoの削除処理
    deleteTodo(todo: Todo) :void{
        if(!confirm('このtodoを削除します。よろしいですか？')){
            return;
        }
        const id: string = todo.id.toString();
        const fetch = require('isomorphic-unfetch');
        const newTodos: Todo[] = [];

        fetch('//localhost:3000/' + id, {
            method: 'POST'
        }).then(r => r.json()).then(data => data.map(d => 
            {
                const todo: Todo = new Todo();
                todo.id = d.id;
                todo.title = d.title;
                todo.isDone = false;
                //console.log(todo);
                newTodos.push(todo)
            })).then(() => {
                this.setState({
                    todos: newTodos,
                    item: ''
                });
            });    
    }

    //フォームのテキスト入力処理
    updateItem(e) :void{
        this.setState({
            item: e.target.value
        });
    }

    //todoの登録処理
    addTodo(e) :void{
        e.preventDefault();

        if (this.state.item.trim() === '') {
            return;
        }

        const item = {
            title: this.state.item,
        };
        const fetch = require('isomorphic-unfetch');
        const newTodos: Todo[] = [];

        fetch('//localhost:3000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(item)
        }).then(r => r.json()).then(data => data.map(d => 
            {
                const todo: Todo = new Todo();
                todo.id = d.id;
                todo.title = d.title;
                todo.isDone = false;
                //console.log(todo);
                newTodos.push(todo)
            })).then(() => {
                this.setState({
                    todos: newTodos,
                    item: ''
                });
            });        
    }

    /**async getTodoList(): Promise<void> {
        const newTodos: Todo[] = [];
        const fetch = require('isomorphic-unfetch');
        const r = await fetch('//localhost:3000/');
        const data = await r.json();
        data.map(d => 
            {   
              const todo: Todo = new Todo();
              todo.id = d.id;
              todo.title = d.title;
              todo.isDone = false;
              newTodos.push(todo);
            });
        this.setState({
            todos: newTodos
        })
    }**/

    //APIを叩いてtodoを取り出す
    async getTodoList(): Promise<void> {
        const newTodos: Todo[] = [];
        const fetch = require('isomorphic-unfetch');
        const r = await fetch('//localhost:3000/');
        const data = await r.json();
        data.map(d => 
            {   
              const todo: Todo = new Todo();
              todo.id = d.id;
              todo.title = d.title;
              todo.isDone = false;
              newTodos.push(todo);
            });
         this.setState({
           todos: newTodos,
           isLoading: false
         })
      }

    /**async fetchApi(): Promise<Todo[]> {
        const newTodos: Todo[] = [];
        const fetch = require('isomorphic-unfetch');
        await fetch('//localhost:3000/')
        .then(r => r.json()).then(data => data.map(d => 
            {   
              const todo: Todo = new Todo();
              todo.id = d.id;
              todo.title = d.title;
              todo.isDone = false;
              newTodos.push(todo);
            }));
            return newTodos;
    }**/

    render() {
        if(this.state.isLoading) {
            this.getTodoList();
        }
        return (
            this.state.isLoading ? <h1>Now Loading...</h1> :
            <div>
                <TodoHeader 
                todos={this.state.todos}
                />
                <TodoList 
                todos={this.state.todos} 
                checkTodo={this.checkTodo}
                deleteTodo={this.deleteTodo}
                />
                <TodoForm
                item={this.state.item}
                updateItem={this.updateItem}
                addTodo={this.addTodo}
                />
                 
            </div>
            
        );
    }
}

export default TodoContainer;