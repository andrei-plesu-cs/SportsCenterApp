import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-check-button',
  templateUrl: './check-button.component.html',
  styleUrls: ['./check-button.component.css']
})
export class CheckButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $("button").click(function () {
        $(".check-icon").hide();
        setTimeout(function () {
          $(".check-icon").show();
        }, 10);
      });
    })
  }

}
