// filepath: c:\Programming\vue-chat-nx\packages\service\src\types\global.d.ts
declare global {
  // Use 'var' or 'let' for global variables declared via augmentation
  // eslint-disable-next-line no-var
  var __srcDir: string ; // Or just string if you ensure it's always set before use
}

// Adding this empty export statement turns this file into a module,
// which is necessary for the global augmentation to be applied correctly.
export {};