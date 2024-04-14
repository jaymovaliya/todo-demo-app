// components/TodoList.tsx

import React from 'react';
import styles from './todolist.module.css';

interface Todo {
  id: string;
  title: string;
  status: string;
  description: string;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className={styles.todoContainer}>
      {todos.map(todo => (
        <div key={todo.id} className={styles.todoCard}>
          <h3 className={styles.todoTitle}>{todo.title}</h3>
          <p className={styles.todoStatus}>Status: {todo.status}</p>
          <p className={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
