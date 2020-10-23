import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/core';
import {CheckCircleIcon, LinkIcon} from '@chakra-ui/icons';

import {Hero} from '../components/Hero';
import {Container} from '../components/Container';
import {Main} from '../components/Main';
import {DarkModeSwitch} from '../components/DarkModeSwitch';
import {CTA} from '../components/CTA';
import {Footer} from '../components/Footer';
import {NavBar} from '../components/NavBar';
import {usePostsQuery} from '../generated/graphql';
import {createUrqlClient} from '../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <Container height="100vh">
      <NavBar />
      {!data ? (
        <div>loading...</div>
        ) : (
          data.posts.map((p) => <div key={p.id}>{p.title}</div>)
          )}
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
    </Container>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
