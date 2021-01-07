import React from 'react';
import {render} from '@testing-library/react';

import {Footer} from '../components/Footer';

describe('<Footer />', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  test('render footer', async () => {
    const {debug} = render(<Footer />);

    debug();
  });
});
