import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisingMapComponent } from './rising-map.component';

describe('RisingMapComponent', () => {
  let component: RisingMapComponent;
  let fixture: ComponentFixture<RisingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
