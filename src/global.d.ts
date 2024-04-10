import { CSSProp } from 'styled-components';

declare module 'react' {
  // have ts recognize SC's css prop on react dom elements
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }

  // support importing the following types within react
  declare module '*.module.css';
}
