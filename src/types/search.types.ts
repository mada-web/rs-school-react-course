import React from 'react';

export interface ISearch {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
