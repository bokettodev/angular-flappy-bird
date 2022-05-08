import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'fb-score',
  template: `
    <img
      *ngFor="let number of score.toString().split('')"
      src="assets/images/png/numbers/{{ number }}.png"
    />
  `,
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  score = 0;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.playgroundStoreService.score$.pipe(untilDestroyed(this)).subscribe((score) => {
      this.score = score;
      this.cdRef.detectChanges();
    });
  }
}
