import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //inputs
  @Input('message') message: string; //the message to be displayed on the modal
  @Input('inputType') inputType: string; //check to see if we need a confirm modal or a information one
  @Input('backgroundColor') backgroundColor: string; //sets the background color of the modal

  //outputs
  @Output('onEmit') onEmit: EventEmitter<string> = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit() {
  }

  //handler for the ok button
  handleOk(): void {
    this.onEmit.emit('ok');
  }

  //handler for the yes button
  handleYes(): void {
    this.onEmit.emit('yes');
  }

  //handler for the no button
  handleNo(): void {
    this.onEmit.emit('discard');
  }

}
