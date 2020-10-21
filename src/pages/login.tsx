import React from 'react';
import {Formik, Form} from 'formik';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/InputField';
import {Button} from '@chakra-ui/core';
import {useLoginMutation} from '../generated/graphql';
import {toErrorMap} from '../utils/toErrorMap';
import {useRouter} from 'next/router';

interface loginProps {

}

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{}, loginUser] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={async (values, {setErrors}) => {
          const response = await loginUser({options: values});
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push('/');
          };
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>

  );
};

export default Login;
