import { Component, OnInit } from '@angular/core'
import { SocketioService } from '../../services/socketio.service'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit {
  constructor(private socketService: SocketioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.socketService.setupSocketConnection()
  }

  logout(): void {
    this.authService.logout()
  }
}
