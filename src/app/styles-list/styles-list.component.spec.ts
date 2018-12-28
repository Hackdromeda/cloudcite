import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesListComponent } from './styles-list.component';

describe('StylesListComponent', () => {
  let component: StylesListComponent;
  let fixture: ComponentFixture<StylesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
