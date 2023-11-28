import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVetementComponent } from './update-vetement.component';

describe('UpdateVetementComponent', () => {
  let component: UpdateVetementComponent;
  let fixture: ComponentFixture<UpdateVetementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVetementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVetementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
