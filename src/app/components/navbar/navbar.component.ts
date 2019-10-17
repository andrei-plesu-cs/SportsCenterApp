import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //check if the button was triggered so it can display a blur background behind the navbar for small
  //screens
  isClicked: boolean = false;

  constructor() { }

  ngOnInit() {

    //the jquery used to trigger the drop down menu on small displays
    $(document).ready(function () {
      $('.first-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
      });

    });
  }

}
