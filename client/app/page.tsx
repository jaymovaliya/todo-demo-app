'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const TodoPage: React.FC = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchTodos(token);
    }
  }, []);

  const fetchTodos = async (token: string) => {
    try {
      const response = await fetch('http://localhost:9091/todos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setFilteredTodos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Handle error
    }
  };

  const filterTodos = (status: string) => {
    setActiveFilter(status);
    if (status === 'all') {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter(todo => todo.status === status);
      setFilteredTodos(filtered);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Todo List</h1>
        <button className={styles.createTodoButton} onClick={() => {}}>Create New Todo</button>
      </div>
      <div className={styles.filters}>
      <button className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`} onClick={() => filterTodos('all')}>All</button>
        <button className={`${styles.filterButton} ${activeFilter === 'Not Started' ? styles.active : ''}`} onClick={() => filterTodos('Not Started')}>Todo</button>
        <button className={`${styles.filterButton} ${activeFilter === 'In Progress' ? styles.active : ''}`} onClick={() => filterTodos('In Progress')}>In Progress</button>
        <button className={`${styles.filterButton} ${activeFilter === 'Completed' ? styles.active : ''}`} onClick={() => filterTodos('Completed')}>Done</button>
      </div>
      <div className={styles.todoContainer}>
      {filteredTodos.map(todo => (
        <div key={todo.id} className={styles.todoCard}>
          <h3 className={styles.todoTitle}>{todo.title}</h3>
          <p className={styles.todoStatus}>Status: {todo.status}</p>
          <p className={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TodoPage;
