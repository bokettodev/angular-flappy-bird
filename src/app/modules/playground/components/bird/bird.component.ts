import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'fb-bird',
  template: `
    <div class="bird"></div>
  `,
  styleUrls: ['./bird.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirdComponent implements OnInit {
  @HostBinding('style.--animation-play-state')
  animationPlayState: AnimationPlayState = 'paused';

  @HostBinding('style.--ground-height')
  groundHeight?: string;

  @HostBinding('style.--bird-width-pixels')
  readonly birdWidthPixels = 34;

  @HostBinding('style.--bird-height-pixels')
  readonly birdHeightPixels = 24;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.groundHeight = groundHeight;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      this.animationPlayState = isPlaying ? 'running' : 'paused';
      this.cdRef.detectChanges();
    });
  }
}
