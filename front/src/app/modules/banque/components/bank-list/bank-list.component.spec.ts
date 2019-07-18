import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankListComponent } from './bank-list.component';
import { By } from '@angular/platform-browser';

describe('BankListComponent', () => {
  let component: BankListComponent;
  let fixture: ComponentFixture<BankListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should init pseudo with the session data', () => {
      const pseudo = "Boby"
      localStorage.setItem("pseudo", pseudo);
      component.ngOnInit();
      expect(component.pseudo).toEqual(pseudo);

    });
  });

  it('should show the session pseudo in the message displayed', async(() => {
    const pseudo = "Boby"
    component.pseudo = pseudo;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const message = fixture.debugElement.query(By.css('#msg-bank'));
      expect(message.nativeElement.textContent).toEqual("Bienvenue dans ta banque "+pseudo+" !");
    });
  }));
});
