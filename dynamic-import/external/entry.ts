import { Wrapper } from './Wrapper';

interface EntryPointConfig {
  children: (() => JSX.Element) | null;
}

export const configuration: EntryPointConfig = {
  children: Wrapper,
};
