import { ReactiveFormsModule } from "@angular/forms";
import UserCreate from "./user-create";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Role } from "../../interfaces/user.interface";
import { By } from "@angular/platform-browser";
import { of, throwError } from "rxjs";

describe('UserCreate Component', () => {
    let component: UserCreate;
    let fixture: ComponentFixture<UserCreate>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const spyUserService = jasmine.createSpyObj('UserService', ['createUser']);
        const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
        imports: [UserCreate, ReactiveFormsModule],
        providers: [
            { provide: UserService, useValue: spyUserService },
            { provide: Router, useValue: spyRouter }
        ]
        }).compileComponents();

        userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(UserCreate);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid when empty', () => {
        expect(component.userForm.valid).toBeFalse();
    });

    it('form should be valid when all fields are filled', () => {
        component.userForm.setValue({
        id:0,
        fullname: 'Test User',
        username: 'testuser',
        password: '123456',
        role: Role.USER
        });
        expect(component.userForm.valid).toBeTrue();
    });

    it('submit button should be disabled when submitting', () => {
        component.isSubmitting = true;
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
        expect(button.disabled).toBeTrue();
    });

    it('should call createUser on submit', () => {
        component.userForm.setValue({
        id:0,
        fullname: 'Test User',
        username: 'testuser',
        password: '123456',
        role: Role.USER
        });

        userServiceSpy.createUser.and.returnValue(of({
        id: 0,
        fullname: 'Test User',
        username: 'testuser',
        password: '123456',
        role: Role.USER
        }));

        component.onSubmit();

        expect(userServiceSpy.createUser).toHaveBeenCalledWith({
        id: 0,
        fullname: 'Test User',
        username: 'testuser',
        password: '123456',
        role: Role.USER
        });
    });

    it('should set isSubmitting to false on error', () => {
        component.userForm.setValue({
        id:0,
        fullname: 'Test User',
        username: 'testuser',
        password: '123456',
        role: Role.USER
        });

        userServiceSpy.createUser.and.returnValue(throwError(() => new Error('Error creating user')));

        component.onSubmit();

        expect(component.isSubmitting).toBeFalse();
    });

    it('should call onCancel when cancel button is clicked', () => {
        spyOn(component, 'onCancel');
        const cancelButton = fixture.debugElement.query(By.css('button.btn-secondary')).nativeElement as HTMLButtonElement;
        cancelButton.click();
        expect(component.onCancel).toHaveBeenCalled();
    });
})