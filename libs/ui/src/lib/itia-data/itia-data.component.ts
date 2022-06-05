import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrionRepository } from '@impetus/state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'itia-data',
  templateUrl: './itia-data.component.html',
  styleUrls: ['./itia-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItiaDataComponent {
  @Input() entities$ = this.orion.entities$;
  constructor(private orion: OrionRepository) {}
}
