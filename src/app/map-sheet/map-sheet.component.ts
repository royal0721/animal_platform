import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InformSheetService } from '../inform-sheet.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { } from 'googlemaps';

@Component({
  selector: 'app-map-sheet',
  templateUrl: './map-sheet.component.html',
  styleUrls: ['./map-sheet.component.css']
})
export class MapSheetComponent implements OnInit {
  @ViewChild('gmap', {static: true}) public gmapElement: any;

  map: google.maps.Map;
  currentSelectedMarker:google.maps.Marker;
  lastMarker:google.maps.Marker;
  geocoder ;
  informs: any[] = [];
  inform_list:any[]=[];
  constructor(private informSheetService :InformSheetService) {
   }
   
   destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    this.informSheetService.getInform().pipe(takeUntil(this.destroy$)).subscribe((informs: any[])=>{
      
      console.log(informs);
      this.informs=informs;
      this.inform_list=convertToMapPoints(this.informs);
      
      console.log(convertToMapPoints(this.informs));
      var gmarkers = [];
      const daan = { lat: 25.027714782105257, lng: 121.54356784691174 };
      let times = 0;
      const mapProperties = {
         center: new google.maps.LatLng(25.027714782105257, 121.54356784691174),
         zoom: 13,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(this.gmapElement.nativeElement,    mapProperties);
    const geocoder = new google.maps.Geocoder();     
   placeMap(this.inform_list);
   google.maps.event.addListener(map, 'click', function(event) {
     times=times+1;
     if(times<=1){
       placeMarker(event.latLng);
       (<HTMLInputElement>document.getElementById("location_added_long")).value = event.latLng;
       console.log((<HTMLInputElement>document.getElementById("location_added_long")).value);
      }else if(times>1){
      placeMarker(event.latLng);
      gmarkers[times-2].setMap(null);
      (<HTMLInputElement>document.getElementById("location_added_long")).value = event.latLng;
      console.log((<HTMLInputElement>document.getElementById("location_added_long")).value);
      //location_added
    }
     
  });
  function placeMap(locations){
    for (var i = 0; i < locations.length; i++) {  
      console.log(locations);
      var marker = new google.maps.Marker({
        position: locations[i].latlon,
        map: map,
        title: "Animal TNR platform",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      });
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent(locations[i].message.content);
      infowindow.open(map, marker);
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i].message.content);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }
  function placeMarker(location) {

      var marker = new google.maps.Marker({
          position: location, 
          map: map,
          icon: {
           url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
         }
      });  
      geocoder.geocode(
        { location: location },
        (
          results: google.maps.GeocoderResult[],
          status: google.maps.GeocoderStatus
        ) => {
          if (status === "OK") {
            if (results[0]) {
              var city = results[0].address_components[2].types[0];
              var address=results[0].formatted_address;

              for(var i=0;i<results[0].address_components.length;i++){
                if(results[0].address_components[i].types[0]=='route'){
                  var road = results[0].address_components[i].long_name;
                  
                  (<HTMLSelectElement>document.getElementById("location_added_addr")).value = road;
                }else if(results[0].address_components[i].types[0]=='administrative_area_level_3'){
                  var area = results[0].address_components[i].long_name;
                  
                  (<HTMLSelectElement>document.getElementById("location2_selector")).value = area;
                }else if(results[0].address_components[i].types[0]=='administrative_area_level_1'){
                  var city = results[0].address_components[i].long_name;
                  (<HTMLSelectElement>document.getElementById("location_selector")).value = city;
                }
              }
              console.log(results[0]);
              const addcontent =
              '<div id="content" style="width:200px;height:100px;"><div style="font-size:20px;color:grey;">' +
              '預計通報位置:</div><div style="font-size:18px;color:rgb(93,93,93);">'+address.slice(5, )+"</div></div>";
              const infowindow = new google.maps.InfoWindow({
               content: addcontent,
             });
             infowindow.open(map, marker);
             marker.addListener("click", () => {
               infowindow.open(map, marker);
             });
             gmarkers.push(marker);              
              
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        }
      );

  }
 const contentString =
   '<div id="content" style="width:120px;height:50px;font-size:20px;">' +
   '您的所在位置' +
   "</div>";

 const infowindow = new google.maps.InfoWindow({
   content: contentString,
 });
   if (navigator.geolocation) {
     console.log("yes");
     navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
         };
         console.log("now"+pos.lat);
         var marker = new google.maps.Marker({
             position: pos,
             map: map
         });
         map.setZoom(13);
         map.setCenter(pos);
         marker.addListener("mouseover", () => {
           infowindow.open(map, marker);
         });
         infowindow.open(map, marker);
       });
 } else {
     alert("未允許或遭遇錯誤！");
 }      
    })





 function convertToMapPoints(response){

  var locations = [];

  for(var i= 0; i < response.length; i++) {
      var animal = response[i];

      var  contentString =
          '<p>' + animal.sex+animal.animal_type +
          '<br><b>名字： </b>: ' + animal.animal_name +
          '<br><b>地址： </b>: ' + animal.location + animal.location2 + animal.location3 +
          '<br><b>經緯度： </b>: ' + animal.location4 +
          '</p>';
      var locationtext = animal.location4.replace("(","");
      locationtext = locationtext.replace(")","");
      locationtext = locationtext.replace(" ","");
      console.log(locationtext)
      var location = locationtext.split(',');
      console.log(parseFloat(location[1]));
      locations.push({
          latlon: new google.maps.LatLng(parseFloat(location[0]), parseFloat(location[1])),
          message: new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 320
          }),
          animal_name: animal.animal_name,
          sex: animal.sex,
          address: animal.location+animal.location2+animal.location3 ,
          location4:location 
  });
}

return locations;
};

  }
 //no need
  click_to_target(){
    console.log('trigger');     
    //var select = document.getElementById('location_selector').value; 
    //console.log(select.Sel);
    if((<HTMLSelectElement>document.getElementById('location_selector')).value&&(<HTMLSelectElement>document.getElementById('location2_selector')).value){    
        console.log((<HTMLSelectElement>document.getElementById('location_selector')).value);
        console.log((<HTMLSelectElement>document.getElementById('location2_selector')).value);
      
      }else{
        console.log("請選擇值");
      }
  }
  

}
//<button style="position: absolute;top:0px;right:350px;top:55px;z-index:2;" (click)="click_to_target()">搜尋定位</button>