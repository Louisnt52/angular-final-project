import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Login } from "./login";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";
import { Role } from "../../pages/users/user/interfaces/user.interface";

describe('Login Component', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;
    
    beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['login']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: spyAuth },
        { provide: Router, useValue: spyRouter }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('form should be valid when username and password are filled', () => {
    component.loginForm.setValue({ username: 'testuser', password: '123456' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should disable login button when form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable login button when form is valid', () => {
    component.loginForm.setValue({ username: 'testuser', password: '123456' });
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeFalse();
  });

  it('should call authService.login on submit', () => {
    component.loginForm.setValue({ username: 'testuser', password: '123456' });
    authServiceSpy.login.and.returnValue(of({ id: 1, username: 'testuser', role: Role.USER, fullname: 'Test User', password: '123456' }));
    
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', '123456');
  });

  it('should set error message on login failure', () => {
    component.loginForm.setValue({ username: 'wrong', password: 'wrong' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Username or password is incorrect')));

    component.onSubmit();

    expect(component.error).toBe('Username or password is incorrect');
  });
})