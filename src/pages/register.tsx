import React from 'react';
import {Formik, Form} from 'formik';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/InputField';
import {Button} from '@chakra-ui/core';
import {useMutation} from 'urql';

interface registerProps {

}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
  register(options: {username:$username, password:$password}){
    user {
      username
      id
    }
    errors {
      field
      message
    }
    
  }
}
`;

export const Register: React.FC<registerProps> = ({}) => {
  const [{}, registerUser] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={async (values) => {
          const response = await registerUser(values);
          return response;
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
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>

  );
};

export default Register;
