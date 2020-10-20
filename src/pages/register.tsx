import React from 'react';
import {Formik, Form} from 'formik';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/InputField';
import {Button} from '@chakra-ui/core';

interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="username"
              placeholder="username goes here"
              label="Username"></InputField>
            <InputField
              name="password"
              placeholder="password goes here"
              label="Password"
              type="password"></InputField>
            <Button
              type="submit"
              mt="10"
              colorScheme="pink"
              isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>

  );
};

export default Register;
