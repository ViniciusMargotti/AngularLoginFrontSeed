import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class User {
  constructor(
    public status: string,
  ) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {

    interface Jtw {
      token: string;
    }

    const request = {username, password};

    return this.httpClient.post<Jtw>('http://localhost:8090/authenticate', request);
  }


  isUserLoggedIn() {
    const user = sessionStorage.getItem('tokenAuth');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('tokenAuth');
  }

  saveToken(token) {
    sessionStorage.setItem('tokenAuth', token);
  }


}
