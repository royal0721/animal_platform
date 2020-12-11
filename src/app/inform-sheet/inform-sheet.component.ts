import { Component, OnInit } from '@angular/core';
import { InformSheetService } from '../inform-sheet.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {area_data} from './area_data'


@Component({
  selector: 'app-inform-sheet',
  templateUrl: './inform-sheet.component.html',
  styleUrls: ['./inform-sheet.component.css']
})
export class InformSheetComponent implements OnInit {
  
  informs: any[] = [];
  selected_area={area:'',zone:[]};
  selected_zone: any[] = [];
  area_data = area_data;
  constructor(private informSheetService :InformSheetService) { }

  userForm = new FormGroup({
    user_name: new FormControl('', Validators.nullValidator && Validators.required),
    animal_name: new FormControl('', Validators.nullValidator && Validators.required),
    animal_type:new FormControl('', Validators.nullValidator && Validators.required),
    sex: new FormControl('', Validators.nullValidator && Validators.required),
    location: new FormControl('', Validators.nullValidator && Validators.required),
    location2: new FormControl('',Validators.nullValidator && Validators.required),
    location3: new FormControl('',Validators.nullValidator && Validators.required)
  });

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit(): void {
    this.informSheetService.getInform().pipe(takeUntil(this.destroy$)).subscribe((informs: any[])=>{
      console.log(informs);
      this.informs=informs;
    })  
  }
    
  onSubmit() {

    this.informSheetService.addInform(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message:', data);
      this.userForm.reset();
    });

    console.log('Submit'+this.userForm.value);
    console.warn(this.userForm.value);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
 
  getArea(id:string){
    console.log(id);
    this.selected_area=(this.area_data.find(c => c.area === id));
    this.userForm.controls['location2'].setValue('');
    this.selected_zone=(this.selected_area.zone);
    console.log(this.selected_zone);
  }

}