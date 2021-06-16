import env from './env';

export default function isPlatform(platform: 'web' | 'chrome' | 'electron'): boolean {
  return env('PLATFORM') === platform;
}
