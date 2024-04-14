'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/TodoHeader/TodoHeader';
import TodoList from './components/TodoList/TodoList';
import CreateNewTodo from './components/CreateTodo/CreateTodo';

const TodoPage: React.FC = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await fetch('http://localhost:9091/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      setShowModal(false);
      fetchTodos(token);
    } catch (error) {
      console.error('Error creating todo:', error);
      // Handle error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div>
      <Header 
        activeFilter={activeFilter}
        filterTodos={filterTodos}
        onClickCreateTodo={() => setShowModal(true)}
        onClickLogout={handleLogout}
      />
      <TodoList todos={filteredTodos} />
      {showModal && (
        <CreateNewTodo onSubmit={handleSubmit} hideModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TodoPage;
