import { Component, OnInit } from '@angular/core';
import { InformSheetService } from '../inform-sheet.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../token-storage.service';
import {WebsocketRealtimeService} from '../websocket-realtime.service';
import {area_data} from './area_data'
import { animateChild } from '@angular/animations';


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
  file: File;

  constructor(private informSheetService :InformSheetService, private tokenStorage: TokenStorageService, private WebSocketService: WebsocketRealtimeService ) {

   }

  userForm = new FormGroup({
    informer_id: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    name: new FormControl('', Validators.nullValidator && Validators.required),
    type:new FormControl('', Validators.nullValidator && Validators.required),
    gender: new FormControl('', Validators.nullValidator && Validators.required),
    address: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    address2: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    address3: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required])),
    latlong: new FormControl({ value:'',disabled: true}, Validators.compose([Validators.required]))
  });

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  // get the address
  ngOnInit(): void {
    var nameNroleList = this.tokenStorage.getUser().username.split(",");
    this.userForm.controls['informer_id'].setValue(nameNroleList[0]);
  }
    
  onSubmit() {

    this.userForm.controls['address'].setValue((<HTMLSelectElement>document.getElementById("address_selector")).value);
    this.userForm.controls['address2'].setValue((<HTMLSelectElement>document.getElementById("address2_selector")).value);
    this.userForm.controls['address3'].setValue((<HTMLSelectElement>document.getElementById("location_added_addr")).value);
    this.userForm.controls['latlong'].setValue((<HTMLSelectElement>document.getElementById("location_added_long")).value);
    var data = this.userForm.getRawValue();
    console.log(this.file);
    data.File =this.file;
    console.log(data);
    data.org_status=1;
    data.captured_time=new Date().getTime();
    data.progress_time=data.captured_time;
    data.handler_id=data.informer_id;
    data.now_status=0;
    const formData = new FormData();

    // Append files to the virtual form.
    formData.append("file", this.file)
    formData.append('user', new Blob([JSON.stringify(data)], {
      type: "application/json"
    }));
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });
    // for (var key of Object.keys(json)) {
    //   formData.append(key,json[key])
    // }
    // Optional, append other kev:val rest data to the form.

    this.informSheetService.addInform(formData).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message:', data);
      const message = JSON.parse(JSON.stringify(data));
      let result = {};
      let time = new Date(message.captured_time);
      //alert(message.captured_time);
      result["id"]=message.id;
      result["address1"]=message.address2;
      // alert(message.address2);
      result["animal_type"]=message.type;

      if(message.gender==1){
        result["animal_gender"]="公";
      }else if(message.gender==0){
        result["animal_gender"]="母";
      }else{
        result["animal_gender"]="未知";
      }
      
      result["time"]=time.getTime();
      this.userForm.reset();
      window.location.reload();
      this.WebSocketService.send(result);

    });

    console.log(formData);

    console.log('Submit'+this.userForm.getRawValue());
  }

  ngOnDestroy() {
    
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
 
  getArea(id:string){

    console.log(id);
    this.selected_area=(this.area_data.find(c => c.area === id));
    this.userForm.controls['address2'].setValue('');
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
      let control = this.userForm.get('address')
      control.disable();
    }
  }

  onFileChanged(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.url = reader.result; 
        console.log('Submit'+this.userForm.value);
      };
    }
  }
}