import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PlaygroundStoreService {
  readonly isPlaying$: Observable<boolean>;
  readonly objectsSpeedPixelsPerSecond$: Observable<number>;
  readonly backgroundSpeedPixelsPerSecond$: Observable<number>;
  readonly pipesHorizontalIndentPixels$: Observable<number>;
  readonly groundHeight$: Observable<string>;

  private readonly isPlaying$$ = new BehaviorSubject(true);
  private readonly objectsSpeedPixelsPerSecond$$ = new BehaviorSubject(50);
  private readonly backgroundSpeedPixelsPerSecond$$ = new BehaviorSubject(10);
  private readonly groundHeight$$ = new BehaviorSubject('22%');
  private readonly pipesHorizontalIndentPixels$$ = new BehaviorSubject(25);

  constructor() {
    this.isPlaying$ = this.isPlaying$$.asObservable();
    this.objectsSpeedPixelsPerSecond$ = this.objectsSpeedPixelsPerSecond$$.asObservable();
    this.backgroundSpeedPixelsPerSecond$ = this.backgroundSpeedPixelsPerSecond$$.asObservable();
    this.pipesHorizontalIndentPixels$ = this.pipesHorizontalIndentPixels$$.asObservable();
    this.groundHeight$ = this.groundHeight$$.asObservable();
  }

  setIsPlaying({ isPlaying }: { isPlaying: boolean }): void {
    this.isPlaying$$.next(isPlaying);
  }

  setObjectsSpeedPixelsPerSecond({ speed }: { speed: number }): void {
    this.objectsSpeedPixelsPerSecond$$.next(speed);
  }

  setBackgroundSpeedPixelsPerSecond({ speed }: { speed: number }): void {
    this.backgroundSpeedPixelsPerSecond$$.next(speed);
  }

  setPipesHorizontalIndentPixels({ indent }: { indent: number }): void {
    this.backgroundSpeedPixelsPerSecond$$.next(indent);
  }

  setGroundHeight({ height }: { height: string }): void {
    this.groundHeight$$.next(height);
  }
}
