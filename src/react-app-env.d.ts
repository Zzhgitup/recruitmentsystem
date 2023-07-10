/// <reference types="react-scripts" />
/* 扩展 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string;
  }
}
