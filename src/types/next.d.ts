// Additional Next.js type declarations
declare global {
  interface Window {
    __COMPONENT_ERROR__?: (error: Error, errorInfo: any) => void;
  }
}

export {};