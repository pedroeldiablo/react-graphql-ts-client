import {Box} from '@chakra-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
    variant?: WrapperVariant;

}

export const Wrapper: React.FC<WrapperProps> =
// eslint-disable-next-line react/prop-types
({children, variant ='regular'}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === 'regular' ? '800px' : '400px'}
      w="100%">
      {children}
    </Box>
  );
};
