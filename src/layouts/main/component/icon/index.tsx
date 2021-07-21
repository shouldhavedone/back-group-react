import React from 'react';

import { UnorderedListOutlined } from '@ant-design/icons';


const customIcon = {
  list: <UnorderedListOutlined />
}

interface MenuIconProps {
  icon: string
}

const MenuIconComponent: React.FC<MenuIconProps> = function ({ icon }) {
  if (!icon) return null;
  return customIcon[icon];
}

export default MenuIconComponent;