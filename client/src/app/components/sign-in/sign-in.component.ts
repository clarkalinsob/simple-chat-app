import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string
  password: string
  errorMessage: string
  error: boolean

  constructor(private router: Router, private authService: AuthService) {
    const token = localStorage.getItem('chatapp:user')

    if (token) this.router.navigate(['chatboard'])
  }

  ngOnInit(): void {
    this.username = ''
    this.password = ''
    this.errorMessage = ''
    this.error = false
  }

  onSubmit(): void {
    this.authService.signin(this.username, this.password).subscribe(data => {
      if (data && !data.token) {
        this.error = true
        this.errorMessage = data
      }
    })
  }
}
