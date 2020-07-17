import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core'
import { SocketioService } from '../../services/socketio.service'
import { AuthService } from '../../auth/auth.service'
import { ChannelService } from '../../services/channel.service'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScroll') private scrollContainer: ElementRef

  convo: Observable<any>[]
  newMessage: string
  user: any
  msgSubs: Subscription

  constructor(private socketService: SocketioService, private authService: AuthService, private channelService: ChannelService) {
    this.user = this.authService.getCurrentUser()
    this.channelService.getChannelConvo().subscribe(data => {
      this.convo = data
    })

    this.msgSubs = this.socketService.getRealtimeMessage().subscribe(data => {
      if (this.user.username !== data.username) this.convo.push(data)
    })
  }

  ngOnInit(): void {
    this.scrollToBottom()
    this.socketService.setupSocketConnection()
    this.newMessage = ''
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
    } catch (err) {}
  }

  logout(): void {
    this.authService.logout()
  }

  onSubmit(): void {
    if (this.newMessage.trim() !== '') {
      const msgObject = Object.assign(this.user, {
        message: this.newMessage
      })

      this.socketService.sendMessage(msgObject).subscribe(data => {
        this.convo.push(data)
      })

      this.newMessage = ''
    }
  }
}
