import {Button} from '@chakra-ui/core';
import {Form, Formik} from 'formik';
import {withUrqlClient} from 'next-urql';
import {useRouter} from 'next/router';
import React from 'react';
import {InputField} from '../components/InputField';
import {Layout} from '../components/Layout';
import {useCreatePostMutation} from '../generated/graphql';
import {createUrqlClient} from '../utils/createUrqlClient';


export const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{title: '', text: ''}}
        onSubmit={async (values) => {
          await createPost({input: values});
          router.push('/');
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"></InputField>
            <InputField
              textarea
              name="text"
              placeholder="Add text..."
              label="Body"
            ></InputField>
            <Button
              type="submit"
              mt="10"
              colorScheme="pink"
              isLoading={isSubmitting}
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>

    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
