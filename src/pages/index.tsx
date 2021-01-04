import {
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Link as ChakraLink,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/core';
import {CheckCircleIcon, LinkIcon} from '@chakra-ui/icons';
import {withUrqlClient} from 'next-urql';
import NextLink from 'next/link';
import React, {useState} from 'react';
import {Container} from '../components/Container';
// import {CTA} from '../components/CTA';
import {DarkModeSwitch} from '../components/DarkModeSwitch';
import {Footer} from '../components/Footer';
import {Hero} from '../components/Hero';
import {Layout} from '../components/Layout';
import {Main} from '../components/Main';
import {UpdootSection} from '../components/UpdootSection';
import {usePostsQuery} from '../generated/graphql';
import {createUrqlClient} from '../utils/createUrqlClient';
import {EditDeletePostButtons} from '../components/EditDeletePostButtons';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  console.log(variables);

  const [{data, fetching}] = usePostsQuery({
    variables,
  });
  // TODOS handle this more eligantly
  if (!fetching && !data) {
    return <div>your query failed for some reason</div>;
  }

  return (
    <Container min-height="100vh">
      <Layout>
        {fetching && !data ? (
        <div>loading...</div>
        ) : (
          <>
            <Stack spacing={8}>
              {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ),
              )}
            </Stack>
          </>
          )}
        {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
             load more
          </Button>
        </Flex>
      ) : null}
        <Hero />
        <Main>
          <Text>
        Example repository of <Code>Next.js</Code>
         + <Code>chakra-ui</Code> +{' '}
            <Code>typescript</Code>.
          </Text>

          <List spacing={3} my={0}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <ChakraLink
                isExternal
                href="https://chakra-ui.com"
                flexGrow={1}
                mr={2}
              >
            Chakra UI <LinkIcon />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
              </ChakraLink>
            </ListItem>
          </List>
        </Main>

        <DarkModeSwitch />
        <Footer>
          <Text>Next ❤️ Chakra</Text>
        </Footer>
        {/* <CTA /> */}
      </Layout>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
