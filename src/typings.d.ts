export {};

declare global {
  interface Window {
    ShowPromptDialog: Function;
    jQuery: Function;
  }
}

declare module "*.less";
