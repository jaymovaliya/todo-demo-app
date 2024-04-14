import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './create-todo.module.css';

interface CreateNewTodoProps {
  onSubmit: (values: any) => void;
  hideModal: () => void;
}

const CreateNewTodo: React.FC<CreateNewTodoProps> = ({ onSubmit, hideModal }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(100, 'Title must be at most 100 characters'),
    description: Yup.string().max(2000, 'Description must be at most 2000 characters')
  });

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Create New Todo</h2>
        <Formik initialValues={{ title: '', description: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ isSubmitting }) => (
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
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>Submit</button>
              <button type="button" onClick={hideModal} className={styles.cancelButton}>Cancel</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateNewTodo;
