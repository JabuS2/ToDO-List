import React from 'react';  // Importa a biblioteca React para construir o componente
import './TodoItem.css';  // Importa o arquivo de estilos CSS para estilizar o componente TodoItem

// Define o componente funcional TodoItem, que recebe as props todo, deleteTodo e updateTodoStatus
const TodoItem = ({ todo, deleteTodo, updateTodoStatus }) => {
  
  // Função para alternar o status da tarefa entre 'pending' e 'completed'
  const toggleStatus = () => {
    // Define um novo status com base no status atual da tarefa
    const newStatus = todo.status === 'pending' ? 'completed' : 'pending';
    // Chama a função updateTodoStatus passando o ID da tarefa e o novo status
    updateTodoStatus(todo._id, newStatus);
  };

  // Retorna a estrutura JSX do item da taref
  return (
    <div className="todo-card">
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        <p className={`todo-status ${todo.status}`}>{todo.status}</p>
        <p className="todo-description">{todo.description}</p> 
        <p className="todo-difficulty">Dificuldade: {todo.difficulty}</p>
      </div>
      <button className="toggle-status-button" onClick={toggleStatus}>
        {todo.status === 'pending' ? 'Marcar como Completa' : 'Marcar como Pendente'}
      </button>
      <button className="delete-button" onClick={() => deleteTodo(todo._id)}>
        Excluir
      </button>
    </div>
  );
};

export default TodoItem;
