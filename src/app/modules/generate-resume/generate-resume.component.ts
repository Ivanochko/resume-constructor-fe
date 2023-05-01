import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {UserAllData} from "../../shared/models/user-all-data";
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-generate-resume',
  templateUrl: './generate-resume.component.html',
  styleUrls: ['./generate-resume.component.scss', '../typical-section.scss']
})
export class GenerateResumeComponent implements OnInit {

  userAllData!: UserAllData
  @ViewChildren('cv-container') content!: ElementRef;

  constructor(
    private userService: UserService
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
    let cvContainer = document.getElementById("cv-container");
    const options = {
      filename: this.userAllData.firstName + "-" + this.userAllData.lastName + ".pdf",
      image: {type: 'jpeg', quality: 0.98},
      html2canvas: {scale: 3, width: 595, height: 841.5},
      jsPDF: {unit: 'in', orientation: "p"}
    }
    html2pdf()
      .from(cvContainer)
      .set(options)
      .save()
  }

  formatDateFromApi(date: string): string {
    let numbers = date.split("-");
    return numbers[2] + "." + numbers[1] + "." + numbers[0];
  }

}
