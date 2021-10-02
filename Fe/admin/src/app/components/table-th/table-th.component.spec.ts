import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableThComponent } from './table-th.component';

describe('TableThComponent', () => {
  let component: TableThComponent;
  let fixture: ComponentFixture<TableThComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableThComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
