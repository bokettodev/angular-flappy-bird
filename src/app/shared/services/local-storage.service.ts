import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@shared/tokens';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {}

  get length(): number {
    return this.localStorage.length;
  }

  getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }

  clear(): void {
    this.localStorage.clear();
  }

  key(index: number): string | null {
    return this.localStorage.key(index);
  }
}
