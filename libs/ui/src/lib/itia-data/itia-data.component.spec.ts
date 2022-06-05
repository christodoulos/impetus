import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItiaDataComponent } from './itia-data.component';

describe('ItiaDataComponent', () => {
  let component: ItiaDataComponent;
  let fixture: ComponentFixture<ItiaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItiaDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItiaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
