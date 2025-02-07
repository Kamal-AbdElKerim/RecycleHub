import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteItemComponent } from './collecte-item.component';

describe('CollecteItemComponent', () => {
  let component: CollecteItemComponent;
  let fixture: ComponentFixture<CollecteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecteItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollecteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
