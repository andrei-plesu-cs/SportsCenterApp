import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('message') message: string;
  @Input('inputType') inputType: string;
  @Input('backgroundColor') backgroundColor: string;
  @Output('onEmit') onEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log(this.inputType);
  }

  handleOk(): void {
    this.onEmit.emit('ok');
  }

  handleYes(): void {
    this.onEmit.emit('yes');
  }

  handleNo(): void {
    this.onEmit.emit('discard');
  }

}
