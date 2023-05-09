import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {UserAllData} from "../../shared/models/user-all-data";
import {ExportService} from "../../shared/services/export.service";

@Component({
  selector: 'app-generate-resume',
  templateUrl: './generate-resume.component.html',
  styleUrls: ['./generate-resume.component.scss', '../typical-section.scss']
})
export class GenerateResumeComponent implements OnInit {

  userAllData!: UserAllData
  blob?: Blob
  @ViewChildren('cv-container') content!: ElementRef;

  constructor(
    private userService: UserService,
    private exportService: ExportService
  ) {
  }

  ngOnInit(): void {
    this.userService.getAllDataOfCurrentUser()
      .subscribe(userAllData => {
        this.userAllData = userAllData;
      })
  }

  refreshData() {
    this.ngOnInit();
  }

  download() {
    this.exportService.export().subscribe(data => {
      this.blob = new Blob([data], {type: 'application/pdf'});

      let downloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.userAllData.firstName + "_" + this.userAllData.lastName + ".pdf";
      link.click();
    })
  }

  formatDateFromApi(date: string): string {
    let numbers = date.split("-");
    return numbers[2] + "." + numbers[1] + "." + numbers[0];
  }

}
