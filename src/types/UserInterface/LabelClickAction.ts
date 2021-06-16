import React from 'react';

export default interface LabelClickAction {
  key?: string | number,
  label: string;
  onClick?: (event: React.MouseEvent) => void;
}
