import { Component, OnInit } from '@angular/core';
import { InformSheetService } from '../inform-sheet.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../token-storage.service';
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
  url;
  location_text:String;

  constructor(private informSheetService :InformSheetService, private tokenStorage: TokenStorageService) {

   }

  userForm = new FormGroup({
    user_name: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    animal_name: new FormControl('', Validators.nullValidator && Validators.required),
    animal_type:new FormControl('', Validators.nullValidator && Validators.required),
    sex: new FormControl('', Validators.nullValidator && Validators.required),
    location: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    location2: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    location3: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    location4: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required]))
  });

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  // get the address
  ngOnInit(): void {
    var nameNroleList = this.tokenStorage.getUser().username.split(",");
    this.userForm.controls['user_name'].setValue(nameNroleList[0]);
  }
    
  onSubmit() {

    this.userForm.controls['location'].setValue((<HTMLSelectElement>document.getElementById("location_selector")).value);
    this.userForm.controls['location2'].setValue((<HTMLSelectElement>document.getElementById("location2_selector")).value);
    this.userForm.controls['location3'].setValue((<HTMLSelectElement>document.getElementById("location_added_addr")).value);
    this.userForm.controls['location4'].setValue((<HTMLSelectElement>document.getElementById("location_added_long")).value);

    this.informSheetService.addInform(this.userForm.getRawValue()).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message:', data);
      this.userForm.reset();
      window.location.reload();
    });

    console.log('Submit'+this.userForm.getRawValue());
  }

  ngOnDestroy() {
    
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
 
  getArea(id:string){

    console.log(id);
    this.selected_area=(this.area_data.find(c => c.area === id));
    this.userForm.controls['location2'].setValue('');
    if(this.selected_area){
      this.selected_zone=(this.selected_area.zone);
    }else{
      this.selected_zone=[];
    }
    console.log(this.selected_zone);
  }

  lat_test(lan:string){
    var pattern = new RegExp('(/^[+-]?\d+(\.\d+)?$/,/^[+-]?\d+(\.\d+)?$/)');
    var result=pattern.test(lan);
    if(result!=false){
      let control = this.userForm.get('location')
      control.disable();
    }
  }

  onFileChanged(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result; 
        console.log('Submit'+this.userForm.value);
      };
    }
  }
}