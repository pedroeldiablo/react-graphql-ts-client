import React from 'react';
import {Formik, Form} from 'formik';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/InputField';
import {Button, Link} from '@chakra-ui/core';
import {useLoginMutation} from '../generated/graphql';
import {toErrorMap} from '../utils/toErrorMap';
import {useRouter} from 'next/router';
import {createUrqlClient} from '../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';
import NextLink from 'next/link';

// interface loginProps {

// }

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{}, loginUser] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{usernameOrEmail: '', password: ''}}
        onSubmit={async (values, {setErrors}) => {
          const response = await loginUser(values);
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          };
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"></InputField>
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
      <NextLink href='/forgot-password'>
        <Link>Forgotten Your Password? Reset</Link>
      </NextLink>
    </Wrapper>

  );
};

export default withUrqlClient(createUrqlClient)(Login);
