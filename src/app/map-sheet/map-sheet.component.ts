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

// 假設現在沒有資料，我們要怎麼顯示? service出現error的處理。

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
         mapTypeId: google.maps.MapTypeId.ROADMAP,
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

  //建立lang跟lat
  function placeMap(locations){
    for (var i = 0; i < locations.length; i++) {  
      console.log(locations);
      if(locations[i].message.content.includes("貓")==true){
      var marker = new google.maps.Marker({
        position: locations[i].latlon,
        map: map,
        title: "未紮",
        icon: "https://raw.githubusercontent.com/royal0721/cat/main/cat%20(1).png",
        animation: google.maps.Animation.DROP
      });        
      }else{
        var marker = new google.maps.Marker({
          position: locations[i].latlon,
          map: map,
          title: "未紮",
          icon: "https://raw.githubusercontent.com/royal0721/cat/main/dog%20(2).png",
          animation: google.maps.Animation.DROP
        });          
      }

      var infowindow = new google.maps.InfoWindow();
      console.log(locations[i].message.content+"je");
      infowindow.setContent(locations[i].message.content);
      // infowindow.open(map, marker);
      google.maps.event.addListener(marker, "click", (function(marker, i) {
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
                  
                  (<HTMLSelectElement>document.getElementById("address2_selector")).value = area;
                }else if(results[0].address_components[i].types[0]=='administrative_area_level_1'){
                  var city = results[0].address_components[i].long_name;
                  (<HTMLSelectElement>document.getElementById("address_selector")).value = city;
                }
              }
              console.log(results[0]);
              const addcontent =
              '<div id="content" style="width:200px;height:100px;"><div style="font-size:20px;color:grey;font-weight:">' +
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
      map.setZoom(14);
      map.setCenter(pos);
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
      infowindow.open(map, marker);
    });
  } else {
    alert("未允許或遭遇錯誤！");
  }      
  }
  )

 function convertToMapPoints(response){
  console.log("Hello");
  console.log(response);
  var locations = [];

  for(var i= 0; i < response.length; i++) {
      var animal = response[i];
      var gender="";
      if(animal.gender=1){
        gender="公";
      }else if(animal.gender=0){
        gender="母";
      }else if(animal.gender=2){
        gender="未知性別";
      }
      var  contentString =
          '<div style="width:170px;height:auto;" >'    +
          '<h5 style="background-color:grey;color:white;text-align: center;">' +'編號: '+animal.id+'</h5>'+
          '<br><div><h6 style="font-weight:bold;color:#c1c1c1;">性別/品種:</h6><b style="padding-left:5px;font-weight:bold;color:#898989;">'+ gender+animal.type+ '</b></div>'+
          '<br><div><h6 style="font-weight:bold;color:#c1c1c1;">名字:</h6>' +'<b style="padding-left:5px;font-weight:bold;color:#898989;">'+ animal.name +'</b></div>'+
          '<br><div><h6 style="font-weight:bold;color:#c1c1c1;">地址:</h6><b style="padding-left:5px;font-weight:bold;"color:#898989;> ' + animal.address + animal.address2 + animal.address3 +'</b></div>'+
          '<br><div><h6 style="font-weight:bold;color:#c1c1c1;">經緯度:</h6><b style="padding-left:5px;font-weight:bold;color:#898989;"> ' + animal.latlong +'</b></div>'+
          '<img style="width:170px;height:auto;padding-top:10px;" src="data:image/png;base64, '+ animal.img_url + '" />'
          '</p>'
      +'</div>'
      ;
      var locationtext = animal.latlong.replace("(","");
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
          name: animal.name,
          gender: animal.gender,
          address: animal.address+animal.address2+animal.address3 ,
          latlong:location 
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
    if((<HTMLSelectElement>document.getElementById('address_selector')).value&&(<HTMLSelectElement>document.getElementById('address2_selector')).value){    
        console.log((<HTMLSelectElement>document.getElementById('address_selector')).value);
        console.log((<HTMLSelectElement>document.getElementById('address2_selector')).value);
      
      }else{
        console.log("請選擇值");
      }
  }
  
}
//<button style="position: absolute;top:0px;right:350px;top:55px;z-index:2;" (click)="click_to_target()">搜尋定位</button>