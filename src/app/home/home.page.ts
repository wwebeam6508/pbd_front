import { Component,OnInit, HostListener} from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() {
  }

  ngOnInit() {
    AOS.init({
      delay: 400,
      mirror: true
    })
  }

}
