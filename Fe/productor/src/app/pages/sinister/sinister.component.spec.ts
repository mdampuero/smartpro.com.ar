import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterComponent } from './sinister.component';

describe('SinisterComponent', () => {
  let component: SinisterComponent;
  let fixture: ComponentFixture<SinisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
