import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { ChatBoardComponent } from './components/chat-board/chat-board.component'
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin'
  },
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: SignInComponent
      },
      {
        path: 'chatboard',
        component: ChatBoardComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
