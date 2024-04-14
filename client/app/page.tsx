'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/TodoHeader/TodoHeader';
import TodoList from './components/TodoList/TodoList';
import CreateNewTodo from './components/CreateTodo/CreateTodo';
import useApi from './common/hooks';

const TodoPage: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: todos, loading, refetch, deleteData, putData, postData } = useApi('todos');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  const getRefecthUrl = () => {
    if(activeFilter === 'all') {
      return 'todos';
    }
    return `todos?status=${activeFilter}`;
  }

  const refetchData = () => {
    refetch(getRefecthUrl());
  }


  const handleSubmit = async (values: any) => {
    await postData('todos', values);
    refetchData();
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  const deleteTodo = async (id: string) => {
      await deleteData(`todos/${id}`);
      refetchData();
  }

  const updateTodo = async (id: string, values: any) => {
    await putData(`todos/${id}`, values);
    refetchData();
  }

  const filterTodos = (status: string) => {
    setActiveFilter(status);
    if(status === 'all') {
      refetch('todos');
    } else {
      refetch(`todos?status=${status}`);
    }
  }

  return (
    <div>
      <Header 
        activeFilter={activeFilter}
        filterTodos={filterTodos}
        onClickCreateTodo={() => setShowModal(true)}
        onClickLogout={handleLogout}
      />
      <TodoList
        loading={loading}
        todos={todos || []}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      {showModal && (
        <CreateNewTodo onSubmit={handleSubmit} hideModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TodoPage;
