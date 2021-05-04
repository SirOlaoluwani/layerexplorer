/*
 * NoOmniBlocks Messages
 *
 * This contains all the text for the NoOmniBlocks component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.NoOmniBlocks.header',
    defaultMessage: 'No Tradelayer blocks found',
  },
  main: {
    id: 'app.components.NoOmniBlocks.main',
    defaultMessage:
      'If the block you are searching for was just broadcast it might\n' +
      '        take a few minutes for the network to pass it around for us to see\n' +
      '        it.',
  },
  secondary: {
    id: 'app.components.NoOmniBlocks.secondary',
    defaultMessage:
      'If the block you are searching for is a Bitcoin only\n' +
      'block you should use a bitcoin block explorer like\n' +
      '{link}',
    values: {
      link: <a href="https://www.blockchair.com">blockchair.com</a>,
    },
  },
});
