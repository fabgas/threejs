import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  classe:string
  constructor() { 
    this.classe =  'panel ';
  }

  ngOnInit() {
  }
  getPanel() {
    return this.classe;
  }
  action() {
    this.classe =  'panel show';
  }
  validate() {
    this.classe =  'panel ';
  }
}
