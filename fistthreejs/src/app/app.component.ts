import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fistthreejs';
  constructor(private router:Router) {

  }
  onClick(url:string) {
    this.router.navigate([url]);
  }
}
