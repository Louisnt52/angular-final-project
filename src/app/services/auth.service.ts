import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, UserResponse, Role } from '../pages/users/user/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User | null>(
        storedUser ? JSON.parse(storedUser) : null
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        throw new Error('Username or password is incorrect');
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.href = '/login';
  }

  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user?.role === 'ADMIN';
  }

}
