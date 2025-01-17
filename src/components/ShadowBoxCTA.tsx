import React, { ComponentProps, FC, ReactNode } from 'react';
import { styled } from '@storybook/theming';
import { Button } from './Button';

import { breakpoint, spacing, typography } from './shared/styles';

const ShadowBox = styled.div`
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  border-radius: ${spacing.borderRadius.small}px;
`;

const ShadowBoxCTAWrapper = styled(ShadowBox)`
  padding: ${spacing.padding.large}px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;

  @media (min-width: ${breakpoint}px) {
    text-align: left;
  }
`;

const TextWrapper = styled.div`
  line-height: 20px;
  flex: 0 1 100%;

  @media (min-width: ${breakpoint}px) {
    flex: 1;
  }
`;

const HeadingText = styled.div`
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.black};
`;

const MessageText = styled.div`
  font-size: ${typography.size.s2}px;
  margin-top: 4px;
`;

const Action = styled.div`
  flex: 0 0 100%;
  margin-top: 1.5rem;

  button {
    padding: 13px 28px;
  }

  @media (min-width: ${breakpoint}px) {
    flex: 0 0 auto;
    margin-top: 0;
    padding-left: 60px;
  }
`;

interface Props {
  headingText: ReactNode;
  messageText?: ReactNode;
  action: ReactNode;
}

export const ShadowBoxCTA: FC<Props & ComponentProps<typeof ShadowBoxCTAWrapper>> = ({
  headingText,
  messageText,
  ...rest
}) => (
  <ShadowBoxCTAWrapper {...rest}>
    <TextWrapper>
      <HeadingText>{headingText}</HeadingText>
      {messageText && <MessageText>{messageText}</MessageText>}
    </TextWrapper>

    <Action>
      <Button appearance="secondary">Continue</Button>
    </Action>
  </ShadowBoxCTAWrapper>
);
