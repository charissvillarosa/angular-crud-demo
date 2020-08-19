import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Speech, SpeechService} from './speech.service';
import {ToastService} from '../toast/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../modal/confirm-dialog.component';
import {DialogComponent} from '../modal/dialog.component';

@Component({
  selector: 'app-speech-management',
  templateUrl: './speech-management.component.html',
  styleUrls: ['./speech-management.component.css']
})
export class SpeechManagementComponent implements OnInit {
  speeches: Speech[] = [];
  speechForm: FormGroup;
  searchForm: FormGroup;
  selectedSpeech: Speech = {} as Speech;
  filteredSpeeches: Speech[];
  isSearch: boolean;

  @ViewChild('speechTitle') speechTitle: ElementRef;

  constructor(
    private service: SpeechService,
    private toastService: ToastService,
    private modal: NgbModal) {
  }

  async ngOnInit(): Promise<void> {
    this.speechForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl(''),
      speechDate: new FormControl(''),
      keywords: new FormControl(''),
      content: new FormControl(''),
    });

    this.searchForm = new FormGroup({
      searchText: new FormControl('')
    });

    this.isSearch = false;
    this.speeches = await this.service.getList();
    if (this.speeches.length > 0) {
      this.selectedSpeech = this.speeches[0];
    }
    this.setFormValue(this.selectedSpeech);
  }

  setFormValue(value: Speech): void {
    const patchValue = value || {} as Speech;
    this.speechForm.reset({
      title: patchValue.title || '',
      author: patchValue.author || '',
      speechDate: patchValue.speechDate || '',
      keywords: patchValue.keywords || '',
      content: patchValue.content || ''
    });

    for (const key in this.speechForm.controls) {
      if (value) {
        this.speechForm.get(key).enable();
      } else {
        this.speechForm.get(key).disable();
      }
    }

    if (this.speechTitle) {
      this.speechTitle.nativeElement.focus();
    }
  }

  onSelectSpeech(value: Speech): void {
    const doSelect = () => {
      this.setFormValue(value);
      this.selectedSpeech = value;
    };

    if (this.speechForm.dirty) {
      const modal = this.modal.open(ConfirmDialogComponent);
      modal.componentInstance.message = 'Your changes will be discarded. Proceed?';
      modal.result.then(async () => doSelect());
    } else {
      doSelect();
    }
  }

  async addSpeech(): Promise<void> {
    const saved = await this.service.add({title: 'New Speech'} as Speech);
    this.speeches = await this.service.getList();
    this.selectedSpeech = saved;
    this.setFormValue(saved);
    this.speechForm.markAsDirty();
  }

  async save(msg): Promise<void> {
    if (!this.speechForm.valid) {
      // TODO: show validation errors
      return;
    }

    Object.assign(this.selectedSpeech, this.speechForm.value);
    await this.service.update(this.selectedSpeech);
    this.setFormValue(this.selectedSpeech);
    this.showSuccess(msg);
  }

  async delete(msg): Promise<void> {
    const modal = this.modal.open(ConfirmDialogComponent);
    modal.componentInstance.message = 'This will delete the selected speech. Proceed?';
    modal.result.then(async () => {
      await this.service.delete(this.selectedSpeech);
      this.speeches = await this.service.getList();
      this.selectedSpeech = this.speeches.length && this.speeches[0] || undefined;
      this.setFormValue(this.selectedSpeech);
      this.showSuccess(msg);
    });
  }

  showSuccess(msg): void {
    this.toastService.show(msg, {classname: 'bg-success text-light', delay: 1000});
  }

  async filter(): Promise<void> {
    const searchText = this.searchForm.value.searchText.toLowerCase();
    this.speeches = await this.service.filter(searchText);
    this.isSearch = true;
  }

  async resetFilter(): Promise<void> {
    this.speeches = await this.service.getList();
    this.searchForm.reset();
    this.isSearch = false;
  }

  async onChangeSearchInput(): Promise<void> {
    if (!this.searchForm.value.searchText) {
      this.isSearch = false;
      this.speeches = await this.service.getList();
    }
  }

  async share(): Promise<void> {
    const url = await this.service.generatePermalink(this.selectedSpeech);
    const modal = this.modal.open(DialogComponent);
    modal.componentInstance.title = 'Share Link';
    modal.componentInstance.message = url;
  }
}
