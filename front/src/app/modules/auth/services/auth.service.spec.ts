import { TestBed, async } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpOptionsBuilder } from '../libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  let http : HttpClient;
  let builder: HttpOptionsBuilder;
  let service: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpOptionsBuilder],
      imports: [ HttpClientModule ]
    })
    http = TestBed.get(HttpClient);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('singin', () => {
    let spyPost;

    beforeEach(() => {
      spyPost = jest.spyOn(http, 'post');
      /*
      // le mock du localStorage ne fonctionne pas, il faudrait corriger ça pour que le test soit unitaire
      spySetItem = jest.fn();
      var localStorageMock = {
        setItem: spySetItem
      };
      Object.defineProperty(window, 'localStorage', localStorageMock);
      */
      // spy de la getHeader sur HttpOptionsHeader avec un return value sur un mock de HttpHeaders
    });

    /*
    it('should make a post request to the service with email:aa@bb.cc and pwd:azerty', () => {
      service.singin('aa@bb.cc', 'azerty');
      // ajouter le mock en retour de getHeader dans le 3em param du expect
      expect(spyPost).toHaveBeenCalledWith('localhost:3000/singin', {email: 'aa@bb.cc', password: 'azerty'});
    });
    */

    it('should store the token in local storage', async(() => {
      const response = {pseudo: "toto", token: "azerty"}
      spyPost.mockReturnValue(of(response));
      let obs = service.singin('aa@bb.cc', 'azerty');
      obs.subscribe((v) => {
        // il faudrait expect le call sur le spy du setItem du localStorage
        expect(localStorage.getItem('token')).toEqual(response.token.toString());
      });
      
    }));

  });

  describe('isLoggedIn()', () => {
    
    it('should return false when the token is not set in the localStorage', () => {
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return false when the token expired', () => {
      const expires = Date.now()-1;
      localStorage.setItem('tokenExpiration', expires+"");
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return true when the token is set and not expired', () => {
      localStorage.setItem('token', "azerty");
      const expires = Date.now()+1000;
      localStorage.setItem('tokenExpiration', expires+"");
      expect(service.isLoggedIn()).toEqual(true);
    })
  });
});
