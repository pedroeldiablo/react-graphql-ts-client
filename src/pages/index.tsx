import {
  Code, Link as ChakraLink, Link, List,
  ListIcon,
  ListItem, Text,
} from '@chakra-ui/core';
import {CheckCircleIcon, LinkIcon} from '@chakra-ui/icons';
import {withUrqlClient} from 'next-urql';
import NextLink from 'next/link';
import {Container} from '../components/Container';
import {CTA} from '../components/CTA';
import {DarkModeSwitch} from '../components/DarkModeSwitch';
import {Footer} from '../components/Footer';
import {Hero} from '../components/Hero';
import {Layout} from '../components/Layout';
import {Main} from '../components/Main';
import {usePostsQuery} from '../generated/graphql';
import {createUrqlClient} from '../utils/createUrqlClient';


const Index = () => {
  const [{data}] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Container height="100vh">
      <Layout>
        {!data ? (
        <div>loading...</div>
        ) : (
          data.posts.map((p) => <div key={p.id}>{p.title}</div>)
          )}
        <NextLink href="/create-post">
          <Link>create post</Link>
        </NextLink>
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
        <CTA />
      </Layout>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
