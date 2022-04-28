import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class PlaygroundStoreService {
  readonly flyUp$: Observable<void>;
  readonly isPlaying$: Observable<boolean>;
  readonly objectsSpeedPixelsPerSecond$: Observable<number>;
  readonly backgroundSpeedPixelsPerSecond$: Observable<number>;
  readonly pipesHorizontalIndentPixels$: Observable<number>;
  readonly pipesVerticalIndentPixels$: Observable<number>;
  readonly groundHeight$: Observable<string>;

  private readonly flyUp$$ = new Subject<void>();
  private readonly isPlaying$$ = new BehaviorSubject<boolean>(true);
  private readonly objectsSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(50);
  private readonly backgroundSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(10);
  private readonly groundHeight$$ = new BehaviorSubject<string>('22%');
  private readonly pipesHorizontalIndentPixels$$ = new BehaviorSubject<number>(150);
  private readonly pipesVerticalIndentPixels$$ = new BehaviorSubject<number>(150);

  constructor() {
    this.flyUp$ = this.flyUp$$.asObservable();
    this.isPlaying$ = this.isPlaying$$.asObservable();
    this.objectsSpeedPixelsPerSecond$ = this.objectsSpeedPixelsPerSecond$$.asObservable();
    this.backgroundSpeedPixelsPerSecond$ = this.backgroundSpeedPixelsPerSecond$$.asObservable();
    this.pipesHorizontalIndentPixels$ = this.pipesHorizontalIndentPixels$$.asObservable();
    this.pipesVerticalIndentPixels$ = this.pipesVerticalIndentPixels$$.asObservable();
    this.groundHeight$ = this.groundHeight$$.asObservable();
  }

  flyUp(): void {
    this.flyUp$$.next();
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
    this.pipesHorizontalIndentPixels$$.next(indent);
  }

  setPipesVerticalIndentPixels({ indent }: { indent: number }): void {
    this.pipesVerticalIndentPixels$$.next(indent);
  }

  setGroundHeight({ height }: { height: string }): void {
    this.groundHeight$$.next(height);
  }
}
