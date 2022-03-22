/* eslint-disable react/destructuring-assignment */
import React from 'react';
// @ts-ignore
import seedrandom from 'seedrandom';
import { TagLink } from './TagLink';
// @ts-ignore
import { StoryLinkWrapper } from '../StoryLinkWrapper';

seedrandom('chromatic testing', { global: true });

export default {
  component: TagLink,
  title: 'Tag/TagLink',
};

export const Default = (args) => <TagLink href="https://chromatic.com">{args.children}</TagLink>;

export const WithLinkWrapper = (args) => (
  <TagLink to="https://chromatic.com" LinkWrapper={StoryLinkWrapper as React.FC<{ to: string }>}>
    {args.children}
  </TagLink>
);

Default.args = {
  children: '⚛️ React',
};

WithLinkWrapper.args = {
  children: '⚛️ React',
};

export const Loading = () => <TagLink isLoading />;
