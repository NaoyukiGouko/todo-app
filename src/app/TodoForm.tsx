import React, {useState} from 'react';

const TodoForm = (props) => {
  const [limit, setLimit] = useState(undefined);
  const [item, setItem] = useState('');

  return (
    <form onSubmit={e => {
      e.preventDefault();
      props.addTodo(item, props.setTodos, limit)
      setLimit('');
      setItem('');
    }} >
      <input type="text" value={item} onChange={e => {setItem(e.target.value)}} />

      <input type="date" value={limit} onChange={e => {setLimit(e.target.value)}} />
      <input type="submit" value="登録"/>
    </form>
  );
}

export default TodoForm;