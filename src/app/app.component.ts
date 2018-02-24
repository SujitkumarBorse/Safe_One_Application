import { Component, OnInit, NgZone } from '@angular/core';
import { } from '@types/googlemaps';
import { LocationService } from './services/location.service';
import { ParseService } from './services/live-query.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  latitude = 19.578418;
  longitude = 75.709007;
  locationList = [];
  locationChosen = false;
  google: any;
  map: any;
  markers = [];
  selectedMediaData = {
    audios: [],
    images: [],
    videos: []
  };

  constructor(private zone: NgZone,
    private locationService: LocationService,
    private parseService: ParseService
  ) { }


  createMarker(place,isLastMarker?:boolean) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createContentWindow(place)
    });
    const icon = {
      url: './assets/images/victim_red_marker.png',
      scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: place.lat, lng: place.lng },
      icon: icon,
      title: place.vname || 'SafeOne'
    });
    if(isLastMarker){
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    
    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
      this.openMediaData(marker);
    });
    marker.set('fbId', place.fbID);
    this.markers.push(marker);
  }

  openMediaData(marker: any) {

    this.selectedMediaData.audios = [];
    this.selectedMediaData.images = [];
    this.selectedMediaData.videos = [];

    if (marker.fbId) {
      // Audio Data
      this.locationService.getAudios(marker.fbId).then((data) => {
        console.log("AuidoData >>>>>", data);
        this.zone.run(() => {
          this.selectedMediaData.audios = data;
        });

      });
      // Video Data
      this.locationService.getVideos(marker.fbId).then((data) => {
        console.log("VideoData >> ", data);
        this.zone.run(() => {
          this.selectedMediaData.videos = data;
        });
      });
      // Image Data
      this.locationService.getImages(marker.fbId).then((data) => {
        console.log("ImagData >> ", data);
        this.zone.run(() => {
          this.selectedMediaData.images = data;
          // alert('updating data');
        });
      });
    }
  }

  createGeoXmanMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createGeoXmanwindow(place)
    });
    const icon = {
      url: './assets/images/investigator_marker.png',
      scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: place.lat, lng: place.lng },
      icon: icon,
      title: place.vname || 'SafeOne'
    });
    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
    this.markers.push(marker);
  }

  createPoliceStationMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createPoliceStationswindow(place)
    });
    const icon = {
      url: './assets/images/police_station_marker.png',
      scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: place.lat, lng: place.lng },
      icon: icon,
      title: place.vname || 'SafeOne'
    });
    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
    this.markers.push(marker);
  }

  createHospitalMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createHospitalswindow(place)
    });
    const icon = {
      url: './assets/images/hospital_marker.png',
      scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: place.lat, lng: place.lng },
      icon: icon,
      title: place.vname || 'SafeOne'
    });
    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
    this.markers.push(marker);
  }

  createLandmaeksMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createLandmarkswindow(place)
    });
    const icon = {
      url: './assets/images/landmark_marker.png',
      scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: place.lat, lng: place.lng },
      icon: icon,
      title: place.vname || 'SafeOne'
    });
    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
    this.markers.push(marker);
  }

  createEZonesMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createEZoneswindow(place)
    });
    const icon = {
      url: './assets/images/safezone_marker.png',
      scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: place.lat, lng: place.lng },
      icon: icon,
      title: place.vname || 'SafeOne'
    });
    this.markers.push(marker);
  }

  ngOnInit() {
    this.initialize();
    // Initialize parse server
    this.locationService.initializeParseServer();
    this.refreshVictimeData();

    // Initialize subscription
    this.parseService.initialize();
    console.log(' initialized parser');
    // Create subscription
    this.parseService.startSubscription();

    // setInterval(()=>{
    //   this.refreshVictimeData();
    // },10000);
  }

  initialize() {

    var myLatlng = new google.maps.LatLng(18.5204, 73.8567);

    var mapOptions = {
      zoom: 10,
      center: myLatlng,
      // mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(initialLocation);
      });
    }
  }

  loadUnsafeZones() {
    this.locationService.loadUnsafeZones().then((unsafeZones) => {
      console.log('Data ', unsafeZones);
      this.markUnsafeZones(unsafeZones);
    });
  }


  markUnsafeZones(unsafeZones){
    // Construct the circle for each value in unsafezone.
    for (var zone in unsafeZones) {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: new google.maps.LatLng(zone['lat'], zone['lng']),
        radius: zone['radius'] * 1
      });
    }
    console.log('Circle added ################ ', zone);
  }

  refreshVictimeData() {
    this.locationService.getAllVictims().then((locations) => {
      console.log('Victimsdata is here :: ', locations);
      for (var i = 0; i < locations.length; i++) {
        this.createMarker(locations[i], i === locations.length-1);
        // this.parseService.newsSubscription();
      }
      // this.refreshGeoxmanData();
      // this.refreshPoliceStationsData();
      // this.refreshHospitalData();
      // this.refreshLandmarkData();
      // this.refreshEZonesData();
    });

  }


  ngOnDestroy() {
    this.parseService.stopUpdate()
  }


  refreshGeoxmanData() {
    this.locationService.getAllGeoXman().then((locations) => {
      // console.log('GeoXmandata is here :: ', locations);
      for (var i = 0; i < locations.length; i++) {
        this.createGeoXmanMarker(locations[i]);
      }
    });
  }
  
  refreshPoliceStationsData() {
    this.locationService.getAllPoliceStations().then((locations) => {
      // console.log('PoliceStationsdata is here :: ', locations);
      for (var i = 0; i < locations.length; i++) {
        this.createPoliceStationMarker(locations[i]);
      }
    });
  }
  refreshHospitalData() {
    this.locationService.getAllHospitals().then((geospot) => {
      // console.log('Hospitalsdata is here :: ', geospot);
      for (var i = 0; i < geospot.length; i++) {
        this.createHospitalMarker(geospot[i]);
      }
    });
  }
  refreshLandmarkData() {
    this.locationService.getAllLandmarks().then((latlong) => {
      // console.log('Landmarksdata is here :: ', latlong);
      for (var i = 0; i < latlong.length; i++) {
        this.createLandmaeksMarker(latlong[i]);
      }
    });
  }

  refreshEZonesData() {
    {
      this.locationService.getAllEZones().then((LONGITUDE) => {
        // console.log('EZonesdata is here :: ', LONGITUDE);
        for (var i = 0; i < LONGITUDE.length; i++) {
          this.createEZonesMarker(LONGITUDE[i]);
        }
      });
    }
  }

}
