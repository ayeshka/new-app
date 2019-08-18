import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Salary } from './salary.modle';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private _salary = new BehaviorSubject<Salary[]>(
    [
      new Salary('s1', 1, 40000, 100, 400, 300, 40, 50 ),
      new Salary('s2', 2, 60000, 200, 300, 500, 30, 20 )
     ]
  );

get salary() {
  return this._salary.asObservable();
}

getsalaryId(id: string){
  return this.salary.pipe(take(1), map(salary => {
    return {...salary.find(p => p.id === id)};
  }));
  }

  constructor() { }
}
