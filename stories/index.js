import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import StoryRouter from 'storybook-router';

import Button from '../app/components/ui/Button';
import RestaurantCard from '../app/components/Restaurant/RestaurantCard';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('RestaurantCard', module)
  .addDecorator(StoryRouter())
  .add('with text', () => <RestaurantCard item={{ link: 'la-pasiva', name: 'La pasivaaa', ratingScore: '45'}} />);
