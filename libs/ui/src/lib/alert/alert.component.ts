import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
