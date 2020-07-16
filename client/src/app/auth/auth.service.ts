import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import decode from 'jwt-decode'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<any>

  constructor(private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('chatapp:token')
    const user = localStorage.getItem('chatapp:user')

    if (token && user) return true
    else return false
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser
  }

  signup(user: any) {
    return this.http.post('http://localhost:5000/api/v1/signup', user)
  }

  signin(username: string, password: string) {
    return this.http
      .post<any>('http://localhost:5000/api/v1/auth/signin', { username, password })
      .pipe(
        map(data => {
          if (data.token) {
            localStorage.setItem('chatapp:token', JSON.stringify(data.token))

            const tokenPayload = decode(data.token)
            this.currentUser = tokenPayload.user

            localStorage.setItem('chatapp:user', JSON.stringify(this.currentUser))
            this.router.navigate(['chatboard'])
          } else return data
        })
      )
  }

  logout(): void {
    this.currentUser = null
    localStorage.removeItem('chatapp:user')
    localStorage.removeItem('chatapp:token')
    this.router.navigate(['signin'])
  }
}
