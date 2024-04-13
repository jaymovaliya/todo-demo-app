import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
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

const SignupForm: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    // Call your signup API here with values
    console.log('Submitting form with values:', values);
  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
