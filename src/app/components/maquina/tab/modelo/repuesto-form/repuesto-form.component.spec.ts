import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepuestoFormComponent } from './repuesto-form.component';

describe('RepuestoFormComponent', () => {
  let component: RepuestoFormComponent;
  let fixture: ComponentFixture<RepuestoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepuestoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepuestoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
