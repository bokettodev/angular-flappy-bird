import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@shared/tokens';
import { DomService } from './dom.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  constructor(
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage,
    private readonly domService: DomService,
  ) {}

  get length(): number {
    return this.localStorage.length;
  }

  getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    const oldValue = this.getItem(key);
    this.localStorage.setItem(key, value);
    this.notify(key, value, oldValue);
  }

  removeItem(key: string): void {
    const oldValue = this.getItem(key);
    this.localStorage.removeItem(key);
    this.notify(key, null, oldValue);
  }

  clear(): void {
    this.localStorage.clear();
    this.notify(null, null, null);
  }

  key(index: number): string | null {
    return this.localStorage.key(index);
  }

  private notify(key: string | null, newValue: string | null, oldValue: string | null): void {
    const event = new StorageEvent('storage', {
      key,
      newValue,
      oldValue,
      storageArea: this.localStorage,
      url: this.domService.window.location.href,
    });

    this.domService.window.dispatchEvent(event);
  }
}
