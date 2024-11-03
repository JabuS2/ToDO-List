import React, { useState, useEffect } from 'react';  // Importa a biblioteca React e os hooks useState e useEffect
import axios from 'axios';  // Importa a biblioteca axios para fazer requisições HTTP
import TodoItem from './TodoItem';  // Importa o componente TodoItem, que representa uma tarefa
import AddTodo from './AddTodo';  // Importa o componente AddTodo, que permite adicionar novas tarefas
import './TodoList.css';  // Importa o arquivo de estilos CSS para estilizar o componente TodoList

// Define o componente funcional TodoList
const TodoList = () => {
  // Declara um estado para armazenar a lista de tarefas
  const [todos, setTodos] = useState([]);
  // Declara um estado para armazenar o status do filtro (todos, pendentes, ou completadas)
  const [filterStatus, setFilterStatus] = useState('all');
  // Declara um estado para armazenar a dificuldade do filtro (todas as dificuldades ou específicas)
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/tasks');
      setTodos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/tasks', newTodo);
      // Incluindo todos os dados da nova tarefa
      setTodos([...todos, { ...newTodo, _id: response.data._id }]); // Supondo que a resposta contenha o _id
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };
  

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    return (filterStatus === 'all' || todo.status === filterStatus) &&
           (filterDifficulty === 'all' || todo.difficulty === filterDifficulty);
  });

  const updateTodoStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/tasks/${id}`, { status: newStatus });
      // Inclua todos os dados da tarefa na atualização
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, status: response.data.status } : todo)));
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      <div className="filter-options">
        <select onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">Todos</option>
          <option value="pending">Pendente</option>
          <option value="completed">Completada</option>
        </select>
        <select onChange={(e) => setFilterDifficulty(e.target.value)} className="filter-select">
          <option value="all">Todas as dificuldades</option>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}  // Certifique-se de que essa chave é única para cada `todo`
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodoStatus={updateTodoStatus}
          />
        ))}
      </div>

    </div>
  );
};

export default TodoList;
