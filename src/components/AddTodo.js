import React, { useState } from 'react';  // Importa a biblioteca React e o hook useState, que permite criar estado em componentes funcionais
import './AddTodo.css';  // Importa o arquivo de estilos CSS para estilizar o componente AddTodo

// Define o componente funcional AddTodo, que recebe uma função addTodo como prop
const AddTodo = ({ addTodo }) => {
  // Cria estados para título, descrição e dificuldade da nova tarefa
  const [title, setTitle] = useState('');  // Estado para armazenar o título da tarefa
  const [description, setDescription] = useState('');  // Estado para armazenar a descrição da tarefa
  const [difficulty, setDifficulty] = useState('Fácil'); // Estado para armazenar a dificuldade da tarefa, com valor padrão 'Fácil'

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();  // Impede o comportamento padrão do formulário, que é recarregar a página
    // Verifica se o título e a descrição não estão vazios
    if (title.trim() && description.trim()) {
      // Chama a função addTodo passando um objeto com as informações da nova tarefa
      addTodo({ title, description, difficulty, status: 'pending' }); // Inclui dificuldade no objeto
      // Reseta os estados para os valores iniciais
      setTitle('');  // Limpa o campo de título
      setDescription('');  // Limpa o campo de descrição
      setDifficulty('Fácil');  // Reseta a dificuldade para o valor padrão
    }
  };


  // Retorna a estrutura JSX do formulário para adicionar uma nova tarefa
  return (
    <form className="add-todo-form" onSubmit={handleSubmit}> 
      <input
        type="text"  // Campo de entrada de texto para o título da tarefa
        value={title}  // O valor do campo é o estado title
        onChange={(e) => setTitle(e.target.value)}  // Atualiza o estado title quando o valor do campo muda
        placeholder="Adicione uma nova tarefa"  // Texto exibido quando o campo está vazio
        className="todo-input"  // Classe CSS para estilizar o campo de entrada
      />
      <textarea
        value={description}  // O valor do campo é o estado description
        onChange={(e) => setDescription(e.target.value)}  // Atualiza o estado description quando o valor do campo muda
        placeholder="Descrição da tarefa"  // Texto exibido quando o campo está vazio
        className="todo-description"  // Classe CSS para estilizar o campo de descrição
      />
      <select
        value={difficulty}  // O valor do campo é o estado difficulty
        onChange={(e) => setDifficulty(e.target.value)}  // Atualiza o estado difficulty quando o valor do campo muda
        className="todo-select"  // Classe CSS para estilizar o campo de seleção
      >
        <option value="Fácil">Fácil</option>
        <option value="Médio">Médio</option> 
        <option value="Difícil">Difícil</option> 
      </select>
      <button type="submit" className="add-button">Adicionar</button> 
    </form>
  );
};

export default AddTodo;
