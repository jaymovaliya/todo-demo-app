
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './update-todo.module.css';

interface Todo {
  _id: string;
  title: string;
  status: string;
  description: string;
}

interface UpdateTodoProps {
  todoId: string;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const UpdateTodo: React.FC<UpdateTodoProps> = ({ todoId, onClose, onSubmit }) => {
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
    const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9091/todos/${todoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch todo');
      }
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.error('Error fetching todo:', error);
      // Handle error
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(100, 'Title must be at most 100 characters'),
    description: Yup.string().max(2000, 'Description must be at most 2000 characters'),
    status: Yup.string().required('Status is required')
  });

  const handleSubmit = async (values: any) => {
    onSubmit(values);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Update Todo</h2>
        <Formik initialValues={{ title: todo.title, description: todo.description, status: todo.status }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ errors, touched, isSubmitting }) => (
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
              <div className={styles.inputGroup}>
                <label htmlFor="status" className={styles.label}>Status</label>
                <Field as="select" id="status" name="status" className={styles.input}>
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Field>
                <ErrorMessage name="status" component="div" className={styles.error} />
              </div>
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>Update</button>
              <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateTodo;
