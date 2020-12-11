import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-map-sheet',
  templateUrl: './map-sheet.component.html',
  styleUrls: ['./map-sheet.component.css']
})
export class MapSheetComponent implements OnInit {
  @ViewChild('gmap') public gmapElement: any;

  map: google.maps.Map;
  
  constructor() { }

  ngOnInit() {
    this.initGMap();
  }
  initGMap = () => {
    const daan = { lat: 25.027714782105257, lng: 121.54356784691174 };
    const mapProp = {
      center: new google.maps.LatLng(25.027714782105257, 121.54356784691174),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let times=0;
    setTimeout(() => {

         const map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
         
         const marker = new google.maps.Marker({
          position: daan,
          map: map,
          
        });

        google.maps.event.addListener(map, 'click', function(event) {
          times=times+1;
          if(times==1){
            placeMarker(event.latLng);
          }
          
       });
       
       function placeMarker(location) {

           var marker = new google.maps.Marker({
               position: location, 
               map: map,
               icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              },
              draggable: true
           });
           const addcontent =
           '<div id="content" style="width:200px;height:80px;font-size:18px;">' +
           "預計通報位置:"+location +
           "</div>";
           const infowindow = new google.maps.InfoWindow({
            content: addcontent,
          });
          infowindow.open(map, marker);
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
           
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
              map.setZoom(19);
              map.setCenter(pos);
              marker.addListener("mouseover", () => {
                infowindow.open(map, marker);
              });
              infowindow.open(map, marker);
            });
      } else {
          alert("未允許或遭遇錯誤！");
      }

    }, 2000);
  }
}
