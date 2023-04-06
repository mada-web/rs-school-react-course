import React from 'react';
import { Spinner } from '../Spinner';

interface ILoadingContainer {
  isLoading: boolean;
  children: JSX.Element | JSX.Element[];
}

export const LoadingContainer = ({ isLoading, children }: ILoadingContainer): JSX.Element => {
  return isLoading ? <Spinner /> : (children as JSX.Element);
};
