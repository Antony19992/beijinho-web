import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Chat } from '../../shared/chat/chat';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,MatToolbarModule, MatButtonModule, MatIconModule, Chat],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
