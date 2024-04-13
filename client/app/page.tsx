'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(100, 'Title must be at most 100 characters'),
    description: Yup.string().max(2000, 'Description must be at most 2000 characters')
  });

  return (
    <div>
      <div className={styles.header}>
        <h1>Todo List</h1>
        <button className={styles.createTodoButton} onClick={() => setShowModal(true)}>Create New Todo</button>
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
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Create New Todo</h2>
            <Formik initialValues={{ title: '', description: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {({ errors, touched }) => (
                <Form>
                  <div className={styles.inputGroup}>
                    <label htmlFor="title" className={styles.label}>Title</label>
                    <Field type="text" id="title" name="title" className={styles.input} />
                    <ErrorMessage name="title" component="div" className={styles.error} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="description" className={styles.label}>Description</label>
                    <Field as="textarea" id="description" name="description" className={styles.input} />
                    <ErrorMessage name="description" component="div" className={styles.error} />
                  </div>
                  <button type="submit" className={styles.submitButton}>Submit</button>
                  <button type="button" onClick={() => setShowModal(false)} className={styles.cancelButton}>Cancel</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
