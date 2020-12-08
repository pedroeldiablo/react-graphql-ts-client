import {Box, Button, Link} from '@chakra-ui/core';
import {Formik, Form} from 'formik';
import {withUrqlClient} from 'next-urql';
import React, {useState} from 'react';
import {InputField} from '../components/InputField';
import {Wrapper} from '../components/Wrapper';
import {useForgotPasswordMutation} from '../generated/graphql';
import {createUrqlClient} from '../utils/createUrqlClient';
import {toErrorMap} from '../utils/toErrorMap';

export const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (<Wrapper variant="small">
    <Formik
      initialValues={{email: ''}}
      onSubmit={async (values) => {
        await forgotPassword(values);
        setComplete(true);
      }}
    >
      {({isSubmitting}) => complete ?
      <Box>Check your email for your password reset link</Box> :
      (
        <Form>
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            type="email"></InputField>
          <Button
            type="submit"
            mt="10"
            colorScheme="pink"
            isLoading={isSubmitting}
          >
          Reset Password
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>);
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
