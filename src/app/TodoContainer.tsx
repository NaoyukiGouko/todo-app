import React, {useState} from 'react';
import Todo from './Todo';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import IsShowAllButton from './isShowAllButton'
import 'isomorphic-unfetch';

interface ITodoContainer {
  todos: Todo[];　//登録されているtodo
  item: string; //フォームに入力されているテキスト
  isLoading: boolean //アクセス時非同期関数のsetStateまでtrueとしロード画面を表示
  isShowAll: boolean //falseの場合完了済みのタスクを表示しない
}

//APIを叩いてtodoを取り出す
async function getTodoList(setTodos, setIsLoading?): Promise<void> {
  const newTodos: Todo[] = [];
  const r = await fetch('//localhost:3000/');
  const data = await r.json();
  data.map(d => 
  {   
    const todo: Todo = new Todo();
    todo.id = d.id;
    todo.title = d.title;
    todo.limit = d.limit;
    todo.isDone = false;
    newTodos.push(todo);
  });
  if(setIsLoading) {
      setIsLoading(false);
    }
  setTodos(newTodos);
  
  for(let i = 0; i < newTodos.length; i++) {
    if(Date.parse(newTodos[i].limit.toString()) <  Date.parse(new Date().toDateString())) {
        alert('期限が過ぎているtodoがあります。');
        return;
    }
  }
}
      
//class TodoContainer extends React.Component<any, ITodoContainer> 
export default function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowAll, setIsShowAll] = useState(true);
  const [isLimit, setIsLimit] = useState(false);

  if(isLoading) {
      getTodoList(setTodos, setIsLoading);
  }
  return (
    isLoading ? null :
    <div>
      <TodoHeader 
      todos={todos}
      />
      <TodoList 
      todos={todos} 
      checkTodo={checkTodo}
      deleteTodo={deleteTodo}
      setTodos={setTodos}
      isShowAll={isShowAll}
      setIsShowAll={setIsShowAll}
      />
      <IsShowAllButton
      isShowAll={isShowAll}
      setIsShowAll={setIsShowAll}
      />
      <TodoForm
      setTodos={setTodos}
      addTodo={addTodo}
      todos={todos}
      />
            
    </div>
      
  );
}

//チェックボックスのチェック処理
function checkTodo(todo: Todo,todos: Todo[], setTodos) :void{
  const newTodos = todos.map(todo => {
    return {id: todo.id, title: todo.title, isDone: todo.isDone, limit: todo.limit};
  });

  const pos = todos.map(todo => {
    return todo.id;
  }).indexOf(todo.id);

  newTodos[pos].isDone = !todos[pos].isDone;
  setTodos(newTodos);
}

//todoの削除処理
async function deleteTodo(todo: Todo, todos, setTodos) :Promise<void>{
  if(!confirm('このtodoを削除します。よろしいですか？')){
    return;
  }
  const id: string = todo.id.toString();
  const r = await fetch('//localhost:3000/' + id, {method: 'DELETE'});
  const deleteId = await r.json();
  const newTodos: Todo[] = todos.filter(todo => {
    return deleteId !== todo.id;
  });
  setTodos(newTodos);  
}

//todoの登録処理
async function addTodo(item, setTodos, todos, limit?) :Promise<void>{
  const todo = new Todo;
  todo.title = item;
  limit ? todo.limit = limit : todo.limit = null;
  if (item.trim() === '') {
    return;
  }
  const r = await fetch('//localhost:3000/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
  });
  const newTodo = await r.json();
  const newTodos = todos.slice();
  newTodos.push(newTodo);

  setTodos(newTodos);       
}


    


