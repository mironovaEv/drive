/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, ReactElement } from 'react';

export interface IRoute {
  path: string;
  element?: ReactElement<any, any>;
  icon?: ComponentType<unknown>;
  title?: string;
  children?: IRoute[];
}
