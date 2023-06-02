import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  template: ``,
  styles: [``],
})
export class DropDownComponent<T, S> {
  @Input() options: Array<T>;
  @Input() value: S;
  @Output() valueChange: EventEmitter<S> = new EventEmitter<S>();
}
