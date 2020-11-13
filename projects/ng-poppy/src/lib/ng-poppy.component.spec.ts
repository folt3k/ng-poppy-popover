import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPoppyComponent } from './ng-poppy.component';

describe('NgPoppyComponent', () => {
  let component: NgPoppyComponent;
  let fixture: ComponentFixture<NgPoppyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPoppyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPoppyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
