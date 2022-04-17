import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
import { PipesComponent } from '../pipes/pipes.component';

@UntilDestroy()
@Component({
  selector: 'fb-obstacles',
  template: `
    <ng-container #pipesContainerRef></ng-container>
  `,
  styleUrls: ['./obstacles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObstaclesComponent implements OnInit {
  @HostBinding('style.--ground-height')
  groundHeight = '0';

  @ViewChild('pipesContainerRef', { read: ViewContainerRef, static: true })
  private readonly pipesContainerRef!: ViewContainerRef;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  @HostBinding('style.--host-width-px')
  get hostWidthPx(): number {
    return this.elementRef.nativeElement.clientWidth;
  }

  ngOnInit(): void {
    this.initListeners();
    this.runPipesCreator();
  }

  private initListeners(): void {
    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.groundHeight = groundHeight;
      });
  }

  private runPipesCreator(): void {
    interval(3000)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const pipesComponentRef = this.pipesContainerRef.createComponent(PipesComponent);
        pipesComponentRef.instance.parentWidthPx = this.elementRef.nativeElement.clientWidth;
        this.cdRef.detectChanges();
      });
  }
}
