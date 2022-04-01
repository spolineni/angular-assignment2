import { Component, OnInit } from '@angular/core';
import { map, zip } from 'rxjs';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  jsonAPIData = this.userDataService.getJsonUserData();
  xmlAPIData = this.userDataService.getXmlUserData();
  peopleData: any;
  loading: boolean = true;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    zip(this.jsonAPIData, this.xmlAPIData)
      .pipe(map(x => x[0].person.concat(x[1].person)), map(data => data.sort(this.sortById)))
      .subscribe((data) => {
        this.loading = false;
        this.peopleData = data;
      });
  }

  sortById = (a: any, b: any) => {
    return a.id - b.id;
  }
}
