import React from 'react';
import {Formik, Form} from 'formik';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/InputField';
import {Button} from '@chakra-ui/core';
import {useRegisterMutation} from '../generated/graphql';
import {toErrorMap} from '../utils/toErrorMap';
import {useRouter} from 'next/router';
import {createUrqlClient} from '../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';

interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [{}, registerUser] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: '', email: '', password: ''}}
        onSubmit={async (values, {setErrors}) => {
          const response = await registerUser({options: values});
          console.log(response);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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
              name="email"
              placeholder="email goes here"
              label="Email"
              type="email"></InputField>
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

export default withUrqlClient(createUrqlClient)(Register);
