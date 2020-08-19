import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Confirm?</h4>
    </div>
    <div class="modal-body">
      <p>
        {{message}}
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss(false)">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close(true)">Ok</button>
    </div>
  `
})
export class ConfirmDialogComponent {

  @Input() message = '';

  constructor(public modal: NgbActiveModal) {
  }
}
