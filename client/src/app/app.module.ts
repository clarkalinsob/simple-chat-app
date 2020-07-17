import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SocketioService } from './services/socketio.service'
import { ChatBoardComponent } from './components/chat-board/chat-board.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { HttpClientModule } from '@angular/common/http';
import { ChatMessageComponent } from './components/chat-message/chat-message.component'

@NgModule({
  declarations: [AppComponent, ChatBoardComponent, SignInComponent, ChatMessageComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
