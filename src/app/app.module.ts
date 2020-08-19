import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SpeechManagementComponent} from './speech-management/speech-management.component';
import {AppToastComponent} from './toast/toast.component';
import {ConfirmDialogComponent} from './modal/confirm-dialog.component';
import {DialogComponent} from './modal/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechManagementComponent,
    AppToastComponent,
    ConfirmDialogComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
  ]
})
export class AppModule { }

