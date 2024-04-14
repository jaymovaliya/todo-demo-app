'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../common/auth-service';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleSubmit = async (values: typeof initialValues, { setErrors }: FormikHelpers<typeof initialValues>) => {
    const res: any = await login(values);
    if (res.error) {
      setErrors({ password: res.password });
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Log In</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
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
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? '...' : 'Log In'}
            </button>
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
