import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicOrgChartComponent } from './dynamic-org-chart.component';

describe('DynamicOrgChartComponent', () => {
  let component: DynamicOrgChartComponent;
  let fixture: ComponentFixture<DynamicOrgChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicOrgChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicOrgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
