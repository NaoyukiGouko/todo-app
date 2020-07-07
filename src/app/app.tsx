import React from 'react';
import ReactDOM from 'react-dom';
import TodoContainer from './TodoContainer';
import Todo from './Todo';





const App: React.FC = (props) => {
  return (
    <div>
      <TodoContainer 
        todos= {null}
      />
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);