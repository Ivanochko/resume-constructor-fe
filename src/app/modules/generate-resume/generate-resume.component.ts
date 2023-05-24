import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {ExportService} from "../../shared/services/export.service";
import {Observable, Subscription} from "rxjs";
import {UserAllPersonalFields} from "../../shared/models/user-all-personal-fields";

@Component({
  selector: 'app-generate-resume',
  templateUrl: './generate-resume.component.html',
  styleUrls: ['./generate-resume.component.scss', '../typical-section.scss']
})
export class GenerateResumeComponent implements OnInit, OnDestroy {

  userData!: UserAllPersonalFields
  blob?: Blob
  url: string | undefined

  private eventsSubscription!: Subscription;
  private dataRefreshed: boolean = false;

  @Input() refreshEvent!: Observable<void>;
  @Output() previous = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private exportService: ExportService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(userData => {
        this.userData = userData;
      });
    this.exportService.export().subscribe(data => {
      this.blob = new Blob([data], {type: 'application/pdf'});
      this.url = window.URL.createObjectURL(data);
    });
    this.eventsSubscription = this.refreshEvent.subscribe(() => {
      this.ngOnInit()
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  previousStep() {
    this.dataRefreshed = false
    this.previous.emit();
  }

  download() {
    let link = document.createElement('a');
    link.href = this.url!;
    link.download = this.userData.firstName + "_" + this.userData.lastName + ".pdf";
    link.click();
  }

}
