import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Link} from '../model/Link';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-link-shortener',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './link-shortener.component.html',
  standalone: true,
  styleUrl: './link-shortener.component.css'
})
export class LinkShortenerComponent {
  longLink:string='';
  shortLink: string = '';
  retrievedLongLink: string = '';
  shortLinkInput: string = '';
  link: Link | null = null;

  constructor(private http: HttpClient) {}

  generateShortLink(): void {
    this.http.post<Link>('http://localhost:8080/api/links',{firstUrl: this.longLink}).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          this.link = response;
          this.shortLink = this.link.shortenedUrl;
        },
        (error) => {
          console.error('Error generating short link', error);
        }
      );
  }

  getLongLinkFromShort(): void {
    let shortLink = this.shortLinkInput;
    console.log("shortLink: "+shortLink);

    const prefix = "https://short.ly/";
    if (shortLink.startsWith(prefix)) {
      shortLink = shortLink.slice(prefix.length);
    }
    this.http.get<Link>(`http://localhost:8080/api/links/short/${shortLink}`).subscribe(
      (response) => {
        this.retrievedLongLink = response.firstUrl;
        console.log('Retrieved long link:', this.retrievedLongLink);
      },
      (error) => {
        console.error('Error retrieving long link:', error);
      }
    );
  }
}
