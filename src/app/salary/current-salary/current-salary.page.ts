import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Salary } from '../salary.modle';
import { Subscription } from 'rxjs';
import { SalaryService } from '../salary.service';
import { CalenderService } from 'src/app/calender/calender.service';
import { Calender } from 'src/app/calender/calender.model';

@Component({
  selector: 'app-current-salary',
  templateUrl: './current-salary.page.html',
  styleUrls: ['./current-salary.page.scss'],
})
export class CurrentSalaryPage implements OnInit, OnDestroy {
  CurrentDate = new Date();
 
  loadedSalary: Salary[];
  loadeEvent: Calender[];
  private calendarSub: Subscription;
  private salarySub: Subscription;
  constructor(private slaryService: SalaryService, private navCtrl: NavController, private calenderService: CalenderService) { }

  ngOnInit() {
    this.salarySub =  this.slaryService.salary.subscribe(salary => {
        this.loadedSalary = salary;
      });
    this.calendarSub =  this. calenderService.EventSource.subscribe(event => {
        this.loadeEvent = event;
      });
console.log( new Date().toDateString());
    }

   

    ionViewWillEnter() {
      this.calenderService.fatch().subscribe();
    }

  ngOnDestroy() {
      if (this.salarySub) {
        this.salarySub.unsubscribe();
      }
      if (this.calendarSub) {
        this.calendarSub.unsubscribe();
      }
    }

    
    
    

  

}
