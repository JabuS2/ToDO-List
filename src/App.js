import React from 'react';  // Importa a biblioteca React, que é necessária para criar componentes React
import './App.css';  // Importa o arquivo de estilos CSS para estilizar o componente App
import TodoList from './components/TodoList';  // Importa o componente TodoList, que gerenciará as tarefas da lista

// Define o componente funcional App
function App() {
  // O componente retorna a estrutura JSX que será renderizada na tela
  return (
    <div className="App">
      <h1>To-Do List</h1> 
      <TodoList /> 
    </div>
  );
}

// Exporta o componente App para que possa ser utilizado em outros arquivos
export default App;  
