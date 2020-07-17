import { Component, OnInit, Input } from '@angular/core'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() msgObj: any
  user: any
  right: boolean

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser()
  }

  ngOnInit(): void {
    if (this.msgObj.username === this.user.username) this.right = true
  }
}
