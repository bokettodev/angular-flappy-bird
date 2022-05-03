import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class PlaygroundStoreService {
  groundElement?: HTMLElement;
  obstaclesElement?: HTMLElement;
  nearestPipesElement?: HTMLElement;
  birdElement?: HTMLElement;

  readonly birdVerticalSpeedPixelsPerSecond$: Observable<number>;
  readonly birdWidthPixels$: Observable<number>;
  readonly birdHeightPixels$: Observable<number>;

  readonly flyUp$: Observable<void>;
  readonly flyUpStepPixels$: Observable<number>;

  readonly isPlaying$: Observable<boolean>;
  readonly objectsSpeedPixelsPerSecond$: Observable<number>;
  readonly backgroundSpeedPixelsPerSecond$: Observable<number>;
  readonly pipesHorizontalIndentPixels$: Observable<number>;
  readonly pipesVerticalIndentPixels$: Observable<number>;
  readonly groundHeight$: Observable<string>;

  private readonly birdVerticalSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(450);
  private readonly birdWidthPixels$$ = new BehaviorSubject<number>(34);
  private readonly birdHeightPixels$$ = new BehaviorSubject<number>(24);

  private readonly flyUp$$ = new Subject<void>();
  private readonly flyUpStepPixels$$ = new BehaviorSubject<number>(
    this.birdHeightPixels$$.value * 2,
  );

  private readonly isPlaying$$ = new BehaviorSubject<boolean>(true);
  private readonly objectsSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(100);
  private readonly backgroundSpeedPixelsPerSecond$$ = new BehaviorSubject<number>(10);
  private readonly pipesHorizontalIndentPixels$$ = new BehaviorSubject<number>(175);
  private readonly pipesVerticalIndentPixels$$ = new BehaviorSubject<number>(144);
  private readonly groundHeight$$ = new BehaviorSubject<string>('22%');

  constructor() {
    this.birdVerticalSpeedPixelsPerSecond$ = this.birdVerticalSpeedPixelsPerSecond$$.asObservable();
    this.birdWidthPixels$ = this.birdWidthPixels$$.asObservable();
    this.birdHeightPixels$ = this.birdHeightPixels$$.asObservable();

    this.flyUp$ = this.flyUp$$.asObservable();
    this.flyUpStepPixels$ = this.flyUpStepPixels$$.asObservable();

    this.isPlaying$ = this.isPlaying$$.asObservable();
    this.objectsSpeedPixelsPerSecond$ = this.objectsSpeedPixelsPerSecond$$.asObservable();
    this.backgroundSpeedPixelsPerSecond$ = this.backgroundSpeedPixelsPerSecond$$.asObservable();
    this.pipesHorizontalIndentPixels$ = this.pipesHorizontalIndentPixels$$.asObservable();
    this.pipesVerticalIndentPixels$ = this.pipesVerticalIndentPixels$$.asObservable();
    this.groundHeight$ = this.groundHeight$$.asObservable();
  }

  setBirdVerticalSpeedPixelsPerSecond({ speed }: { speed: number }): void {
    this.birdVerticalSpeedPixelsPerSecond$$.next(speed);
  }

  setBirdWidthPixels({ width }: { width: number }): void {
    this.birdWidthPixels$$.next(width);
  }

  setBirdHeightPixels({ height }: { height: number }): void {
    this.birdHeightPixels$$.next(height);
  }

  flyUp(): void {
    this.flyUp$$.next();
  }

  setFlyUpStepPixels({ step }: { step: number }): void {
    this.flyUpStepPixels$$.next(step);
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
