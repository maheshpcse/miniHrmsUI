import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEncryptDecryptComponent } from './login-encrypt-decrypt.component';

describe('LoginEncryptDecryptComponent', () => {
  let component: LoginEncryptDecryptComponent;
  let fixture: ComponentFixture<LoginEncryptDecryptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEncryptDecryptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEncryptDecryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
