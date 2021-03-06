import React, {useState} from 'react';
import {Flex, IconButton} from '@chakra-ui/core';
import {PostSnippetFragment, useVoteMutation} from '../generated/graphql';
import {ChevronUpIcon, ChevronDownIcon} from '@chakra-ui/icons';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> =
({post}:UpdootSectionProps) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-loading');
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'updoot-loading'}
        aria-label="updoot post"
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
        // eslint-disable-next-line max-len
        icon={<ChevronUpIcon/>}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'downdoot-loading'}
        aria-label="downdoot post"
        colorScheme={post.voteStatus === -1 ? 'red' : undefined}
        // eslint-disable-next-line max-len
        icon={<ChevronDownIcon/>}
      />
    </Flex>
  );
};
