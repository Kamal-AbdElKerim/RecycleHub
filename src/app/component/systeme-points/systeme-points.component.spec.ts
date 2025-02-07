import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemePointsComponent } from './systeme-points.component';

describe('SystemePointsComponent', () => {
  let component: SystemePointsComponent;
  let fixture: ComponentFixture<SystemePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemePointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
