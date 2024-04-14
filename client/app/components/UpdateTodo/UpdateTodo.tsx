
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './update-todo.module.css';
import useApi from '@/app/common/hooks';

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
  const { data } = useApi(`todos/${todoId}`);
  const todo : Todo | null = data;

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
        { 
          todo && (
            <div>
              <h2>Update Todo</h2>
                <Formik initialValues={{ title: (todo as Todo).title, description: (todo as Todo).description, status: (todo as Todo).status }} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
          )
        }
      </div>
    </div>
  );
};

export default UpdateTodo;
