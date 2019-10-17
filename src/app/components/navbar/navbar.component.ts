import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //check if the button was triggered
  isClicked: boolean = false;

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.first-button').on('click', function () {
        console.log('da');
          $('.animated-icon1').toggleClass('open');
      });
    });
  }

}
