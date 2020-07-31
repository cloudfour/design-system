import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BulletLink } from './BulletLink';
import { ItemLink } from './ItemLink';
import { MenuLink } from './MenuLink';
import { color, typography } from '../shared/styles';
import { Icon } from '../Icon';
import { Link } from '../Link';

const MENU = 'menu';
const LINK = 'link';
const BULLET_LINK = 'bullet-link';
export const ITEM_TYPES = Object.freeze({
  MENU,
  LINK,
  BULLET_LINK,
});

const getItemComponent = (itemType) => {
  switch (itemType) {
    case ITEM_TYPES.MENU:
      return Menu;
    case ITEM_TYPES.LINK:
      return ItemLink;
    case ITEM_TYPES.BULLET_LINK:
      return BulletLink;
    default:
      return null;
  }
};

const TopLevelMenuToggle = styled(Link).attrs({ isButton: true, tertiary: true })`
  font-weight: ${typography.weight.bold};
`;

const ArrowIcon = styled(Icon).attrs({ icon: 'arrowright' })`
  && {
    width: 14px;
    width: 14px;
    color: ${color.mediumdark};
    transform: translateY(1px) ${(props) => props.isOpen && `rotate(90deg)`};
    ${(props) => (props.isTopLevel ? `margin-right: 8px;` : `margin-left: 8px;`)}
  }
`;

function Menu({ isTopLevel, item, setMenuOpenStateById, ...rest }) {
  if (!item.children) return null;
  const arrow = <ArrowIcon isOpen={item.isOpen} isTopLevel={isTopLevel} aria-hidden />;
  const MenuToggle = isTopLevel ? TopLevelMenuToggle : MenuLink;
  const toggleOpenState = () => setMenuOpenStateById({ id: item.id, isOpen: !item.isOpen });

  return (
    <li>
      {isTopLevel ? (
        <TopLevelMenuToggle onClick={toggleOpenState}>
          {arrow}
          {item.title}
        </TopLevelMenuToggle>
      ) : (
        <MenuLink isButton onClick={toggleOpenState}>
          {item.title}
          {arrow}
        </MenuLink>
      )}
      {item.isOpen && (
        <TableOfContentsItems
          items={item.children}
          isTopLevel={false}
          setMenuOpenStateById={setMenuOpenStateById}
          {...rest}
        />
      )}
    </li>
  );
}

Menu.propTypes = {
  isTopLevel: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  setMenuOpenStateById: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isTopLevel: false,
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  ${(props) =>
    !props.isTopLevel &&
    `
    padding-left: 22px;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
  `}

  li {
    padding-top: 12px;

    &:first-child {
      padding-top: 0;
    }
  }

  ${(props) =>
    props.isTopLevel &&
    `
    > li {
      padding-top: 20px;
    }
  `}
`;

export function TableOfContentsItems({ currentPath, isTopLevel, items, ...rest }) {
  const isOrderedList = items.every((item) => item.type === ITEM_TYPES.BULLET_LINK);

  return (
    <List isTopLevel={isTopLevel} as={isOrderedList ? 'ol' : 'ul'}>
      {items.map((item) => {
        const ItemComponent = getItemComponent(item.type);
        return (
          <ItemComponent
            key={item.title}
            currentPath={currentPath}
            item={item}
            isTopLevel={isTopLevel}
            {...rest}
          />
        );
      })}
    </List>
  );
}

TableOfContentsItems.propTypes = {
  currentPath: PropTypes.string.isRequired,
  isTopLevel: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(Object.values(ITEM_TYPES)).isRequired,
    }).isRequired
  ).isRequired,
};