import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaygroundStoreService {
  private readonly isPlaying$$ = new BehaviorSubject<boolean>(false);
  readonly isPlaying$ = this.isPlaying$$.asObservable();

  private readonly objectsSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(50);
  readonly objectsSpeedPixelsPerSecond$ = this.objectsSpeedPixelsPerSecond$$.asObservable();

  private readonly backgroundSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(10);
  readonly backgroundSpeedPixelsPerSecond$ = this.backgroundSpeedPixelsPerSecond$$.asObservable();

  private readonly groundHeight$$ = new BehaviorSubject<string>('22%');
  readonly groundHeight$ = this.groundHeight$$.asObservable();

  setIsPlaying({ isPlaying }: { isPlaying: boolean }): void {
    this.isPlaying$$.next(isPlaying);
  }

  setObjectsSpeedPixelsPerSecond({ speed }: { speed: number }): void {
    this.objectsSpeedPixelsPerSecond$$.next(speed);
  }

  setBackgroundSpeedPixelsPerSecond({ speed }: { speed: number }): void {
    this.backgroundSpeedPixelsPerSecond$$.next(speed);
  }

  setGroundHeight({ groundHeight }: { groundHeight: string }): void {
    this.groundHeight$$.next(groundHeight);
  }
}
