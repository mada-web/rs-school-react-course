import { RefObject } from 'react';

export type ISelect = {
  refProp?: RefObject<HTMLSelectElement>;
  errors: {
    [key: string]: string;
  };
};
