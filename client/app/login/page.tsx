'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleSubmit = async (values: typeof initialValues, { setErrors }: FormikHelpers<typeof initialValues>) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:9091/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if(errorData.code === "INVALID_USERNAME_OR_PASSWORD") {
          setErrors({ password: errorData.message })
          setLoading(false);
          return;
        }
      }
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      console.error('Signup error:', error);
    }
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
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? '...' : 'Log In'}
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
