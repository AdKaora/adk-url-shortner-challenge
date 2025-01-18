import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LinkShortenerComponent} from './link-shortener/link-shortener.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LinkShortenerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adkaoraFront';
}
