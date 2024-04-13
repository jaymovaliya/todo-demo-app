'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter()
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    if (status === 'all') {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter(todo => todo.status === status);
      setFilteredTodos(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <button onClick={() => filterTodos('all')}>All</button>
        <button onClick={() => filterTodos('todo')}>Todo</button>
        <button onClick={() => filterTodos('in progress')}>In Progress</button>
        <button onClick={() => filterTodos('done')}>Done</button>
      </div>
      <div>
        <button onClick={() => {}}>Create New Todo</button>
      </div>
      <div className={styles.todoContainer}>
      {filteredTodos.map(todo => (
        <div key={todo.id}  className={styles.todoCard}>
          <h3 className={styles.todoTitle}>{todo.title}</h3>
          <p className={styles.todoStatus}>Status: {todo.status}</p>
          <p className={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
