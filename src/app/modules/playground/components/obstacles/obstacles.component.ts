import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { interval } from 'rxjs';
import { PipesComponent } from '../pipes/pipes.component';

@Component({
  selector: 'fb-obstacles',
  template: `
    <ng-container #pipesContainerRef></ng-container>
  `,
  styleUrls: ['./obstacles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObstaclesComponent implements OnInit {
  @Input()
  @HostBinding('style.--ground-height')
  groundHeight = '22%';

  @ViewChild('pipesContainerRef', { read: ViewContainerRef, static: true })
  private readonly pipesContainerRef!: ViewContainerRef;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  @HostBinding('style.--host-width-px')
  get hostWidthPx(): number {
    return this.elementRef.nativeElement.clientWidth;
  }

  ngOnInit(): void {
    this.runPipesCreator();
  }

  private runPipesCreator(): void {
    interval(3000).subscribe(() => {
      const pipesComponentRef =
        this.pipesContainerRef.createComponent(PipesComponent);

      pipesComponentRef.instance.parentWidthPx =
        this.elementRef.nativeElement.clientWidth;

      this.cdRef.detectChanges();
    });
  }
}
