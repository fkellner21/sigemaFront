import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFormComponent } from './tipo-form.component';

describe('TipoFormComponent', () => {
  let component: TipoFormComponent;
  let fixture: ComponentFixture<TipoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
