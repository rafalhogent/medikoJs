import { QVueGlobals } from 'quasar';

export function isSpaPlatform(quasar: QVueGlobals): boolean {
  return !quasar.platform.is.electron && !quasar.platform.is.cordova;
}
