import { QVueGlobals } from 'quasar';

export function isSpaPlatform(quasar: QVueGlobals): boolean {
  return !quasar.platform.is.electron && !quasar.platform.is.cordova;
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
