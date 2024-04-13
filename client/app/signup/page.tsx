'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './signup.module.css';
import Link from 'next/link';

const SignupForm: React.FC = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // Call your signup API here with values
    console.log('Submitting form with values:', values);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName" className={styles.label}>First Name</label>
              <Field type="text" id="firstName" name="firstName" className={styles.input} />
              <ErrorMessage name="firstName" component="div" className={styles.error} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName" className={styles.label}>Last Name</label>
              <Field type="text" id="lastName" name="lastName" className={styles.input} />
              <ErrorMessage name="lastName" component="div" className={styles.error} />
            </div>
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
            <button type="submit" className={styles.submitButton}>Sign up</button>
          </Form>
        )}
      </Formik>
      <p className={styles.redirectText}>
        Already have an account?{' '}
        <Link href="/login" passHref legacyBehavior>
          <a className={styles.redirectLink}>Log In</a>
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
