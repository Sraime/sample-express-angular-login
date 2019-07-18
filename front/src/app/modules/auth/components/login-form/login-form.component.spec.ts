import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { of, throwError } from 'rxjs';


describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ HttpClientModule, FormsModule, ReactiveFormsModule ],
      providers: [ AuthService ]
    })
    .compileComponents();
    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const form = fixture.debugElement.query(By.css('#login-form'))
      expect(form).toBeTruthy();
    });
  }));

  it('should have an email field inside the form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const inputEmail = fixture.debugElement.query(By.css('#login-form input[name=email]'));
      expect(inputEmail).toBeTruthy();
    })
  }));

  it('should have an password field inside the form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const inputPwd = fixture.debugElement.query(By.css('#login-form input[name=password]'));
      expect(inputPwd).toBeTruthy();
    })
  }));

  it('should have a login button inside the form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btnLogin = fixture.debugElement.query(By.css('#login-form button'));
      expect(btnLogin.nativeElement.textContent).toEqual("connexion");
    })
  }));

  it('should not have the error message displayed by default', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('#login-error'));
      expect(errorMessage).toBeFalsy();
    });
  }));

  it('should display an error message when an error is handled', async(() => {
    const message = "email ou mot de passe invalide";
    component.idInvalidAuth = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('#login-error'));
      expect(errorMessage.nativeElement.textContent).toEqual(message);
    });
  }));

  describe('submit form', () => {
    let spySingin;

    beforeEach(() => {
       spySingin = jest.spyOn(authService, 'singin');
    });
    
    it('should request the server with given data', async(() => {
      const email = "aaaa@bb.cc";
      const pwd = "azery";
      spySingin.mockReturnValue(of({}));

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let iemail = fixture.debugElement.query(By.css('#login-form input[name=email]')).nativeElement;
        iemail.value = email;
        iemail.dispatchEvent(new Event('input'));
        let ipwd = fixture.debugElement.query(By.css('#login-form input[name=password]')).nativeElement
        ipwd.value = pwd;
        ipwd.dispatchEvent(new Event('input'));
        const btnLogin = fixture.debugElement.query(By.css('#login-form button'));
        btnLogin.nativeElement.click();

        expect(spySingin).toHaveBeenCalledWith(email, pwd);
      });
    }));

    it('should turn to error when login fail', async(() => {
      spySingin.mockReturnValue(throwError("error"));
      component.form.controls['email'].setValue("test@test.com");
      component.form.controls['password'].setValue("123456789");
      component.onSubmit();
      expect(component.idInvalidAuth).toEqual(true);
    }));

    it('should reset the password field when login fail', async(() => {
      const pwd = "azery";
      spySingin.mockReturnValue(throwError("error"));

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let ipwd = fixture.debugElement.query(By.css('#login-form input[name=password]')).nativeElement
        ipwd.value = pwd;
        ipwd.dispatchEvent(new Event('input'));
        component.onSubmit();
        ipwd = fixture.debugElement.query(By.css('#login-form input[name=password]')).nativeElement
        expect(ipwd.value).toEqual("");
      });
    }));

    /*
    il faut mock le setItem du localStorage ...
    et le Date.new pour être sûr du set qui est fait en session
    it('should set the session when the request succeed', () => {  
      const response = {
        pseudo: "zerg";
        token: "fghj",
        expiresIn: 1234
      } 
      spySingin.mockReturnValue(of(response));

      // faire un expect sur le set Item du localStorage
    });
    */
  });

});
