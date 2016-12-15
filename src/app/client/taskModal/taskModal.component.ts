import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { TaskService } from '../shared';
import { TaskModalType } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';

@Component({
  selector: 'task-modal',
  styleUrls: ['./taskModal.component.css'],
  templateUrl: './taskModal.component.html'
})
export class TaskModalComponent {
  @ViewChild('taskModal') public taskModal: ModalDirective;
  @Output() closeTaskModal = new EventEmitter<any>();
  @Output() createTask = new EventEmitter<any>();
  @Input() suggestedTask: any;
  @Input() taskModalType: TaskModalType;
  @Input() email: Email;
  public dueDate: Date;
  private opened: boolean = false;
  /* we have to get this from backend */
  private taskIdList: string = '582639655429c571aae95b37';

  constructor(private _taskService: TaskService) {
    this.dueDate = new Date();
  }

  ngAfterViewInit() {
    console.log('hello `Task Modal` component');
  }

  ngOnChanges() {
    if (this.taskModalType === TaskModalType.create) {
      this.suggestedTask['dueDate'] = new Date();
      this.taskModal.show();
    } else if (this.taskModalType === TaskModalType.edit) {
      this.suggestedTask['dueDate'] = new Date();
      this.taskModal.show();
    }
  }

  public hideChildModal(): void {
    this.taskModal.hide();
    this.closeTaskModal.emit();
  }

  public openDatePicker(): void {
    this.opened = !this.opened;
  }

  public clearDatePicker(): void {
    this.dueDate = void 0;
  }

  public closeDatePicker(): void {
    this.opened = false;
  }

  public createSuggestedTask(suggestedTask: any) {
    this.suggestedTask['dueDate'] = this.dueDate;
    this.createTask.emit(suggestedTask);
    this.hideChildModal();
  }

  public saveTask(task:any) :void {
    console.log("saving task");
    this.hideChildModal();
  }

}
