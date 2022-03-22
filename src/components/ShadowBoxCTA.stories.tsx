import React from 'react';
import { styled } from '@storybook/theming';
import { ShadowBoxCTA } from './ShadowBoxCTA';

// The wrapper allows you to see the shadow in Chromatic
const Wrapper = styled.div`
  padding: 20px;
`;

export default {
  component: ShadowBoxCTA,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  title: 'ShadowBoxCTA',
};

const Story = (args) => <ShadowBoxCTA {...args} />;
export const Default = Story.bind({});
Default.args = {
  headingText: 'Composite component',
  messageText: 'Assemble a composite component out of simpler components',
};

export const WithoutMessageText = Story.bind({});
WithoutMessageText.args = {
  headingText: 'Composite component',
};
