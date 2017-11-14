// TODO(janwalter) use direct browser api for LS
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class AuthService {
  private localStorageService = new LocalStorageService({
    prefix: '',
    storageType: 'localStorage',
  });

  get authToken(): string {
    return this.localStorageService.get('auth-token') as string;
  }

  set authToken(token: string) {
    if (!token) {
      this.localStorageService.remove('auth-token');
    } else {
      this.localStorageService.set('auth-token', `Bearer ${token}`);
    }
  }

  // import { JwtHelper } from 'angular2-jwt';
  // private jwtHelper = new JwtHelper();
  get authTokenWithExpirationCheck() {
    return this.authToken;
  //   if (this.authToken && !this.jwtHelper.isTokenExpired(this.authToken)) {
  //     return this.authToken;
  //   }
  //   return null;
  }
}
