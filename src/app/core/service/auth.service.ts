import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginResponse, LoginUserDetails} from '../models/loginResponse';
import {environment} from 'src/environments/environment';
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginUserDetails>;
  public currentUser: Observable<LoginUserDetails>;
  public accessToken = "";

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<LoginUserDetails>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUserDetails {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/users/login/`, {
        username,
        password,
        device_uuid: "WEB",
        device_type: 3
      })
      .pipe(
        map((response) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          response.user_details.token = response.user_details.tokens.access;
          response.user_details.role = Role.Admin;
          localStorage.setItem('currentUser', JSON.stringify(response?.user_details));
          // console.log(user.tokens.access);
          this.currentUserSubject.next(response?.user_details);
          // this.accessToken=user.tokens.access;
          return response;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({success: false});
  }
}
