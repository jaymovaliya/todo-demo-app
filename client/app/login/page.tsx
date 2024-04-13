'use client'

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.css';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // Call your login API here with values
    console.log('Submitting form with values:', values);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Log In</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <Field type="email" id="email" name="email" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <Field type="password" id="password" name="password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </Form>
        )}
      </Formik>
      <p className={styles.redirectText}>
        Don't have an account?{' '}
        <Link href="/signup" passHref legacyBehavior>
          <a className={styles.redirectLink}>Sign Up</a>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
