import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechManagementComponent } from './speech-management.component';

describe('SpeechManagementComponent', () => {
  let component: SpeechManagementComponent;
  let fixture: ComponentFixture<SpeechManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
