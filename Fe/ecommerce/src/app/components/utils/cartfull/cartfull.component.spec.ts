import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartfullComponent } from './cartfull.component';

describe('CartfullComponent', () => {
  let component: CartfullComponent;
  let fixture: ComponentFixture<CartfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
