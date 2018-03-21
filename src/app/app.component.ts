import { Component, OnInit, NgZone } from '@angular/core';
import { } from '@types/googlemaps';
import { } from '@types/markerclustererplus';
import { LocationService } from './services/location.service';
import { ParseService } from './services/live-query.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as moment from 'moment';


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
  position:any;
  selectedState = "";


  regionData = [{
      "name": "Andaman",
      "position": {
        "lat": 11.7401 , "lng": 92.6586
      }
    },
    {
      "name": "Andhra Pradesh",
      "position": {
        "lat": 17.729830 , "lng": 83.321495
      }
    },
    {
      "name": "Arunachal Pradesh",
      "position": {
        "lat": 27.845148, "lng": 95.247345
      }
    },
    {
      "name": "Assam",
      "position": {
        "lat": 26.244156, "lng": 92.537842
      }
    },
    {
      "name": "Bihar",
      "position": {
        "lat": 25.0961, "lng": 85.3131
      }
    },
    {
      "name": "Chandigarh",
      "position": {
        "lat": 30.741482 , "lng":	76.768066
      }
    },
    {
      "name": "Chhattisgarh",
      "position": {
        "lat": 	21.295132	, "lng": 81.828232
      }
    },
    {
      "name": "Dadra and Nagar Haveli",
      "position": {
        "lat": 20.1809, "lng": 73.0169
      }
    },
    {
      "name": "Daman",
      "position": {
        "lat": 20.3974, "lng": 72.8328
      }
    },
    {
      "name": "Delhi",
      "position": {
        "lat": 28.7041, "lng": 77.1025
      }
    },
    {
      "name": "Goa",
      "position": {
        "lat": 15.2993, "lng": 74.1240
      }
    },
    {
      "name": "Gujarat",
      "position": {
        "lat": 22.2587, "lng": 71.1924
      }
    },
    {
      "name": "Haryana",
      "position": {
        "lat": 29.238478, "lng": 76.431885
      }
    },
    {
      "name": "Himachal Pradesh",
      "position": {
        "lat": 31.1048, "lng": 77.1734
      }
    },
    {
      "name": "Jammu",
      "position": {
        "lat": 32.7266, "lng": 74.8570
      }
    },
    {
      "name": "kashmir",
      "position": {
        "lat": 34.083656, "lng": 74.797371
      }
    },
    {
      "name": "Jharkhand",
      "position": {
        "lat": 23.6102, "lng": 85.2799
      }
    },
    {
      "name": "Karnataka",
      "position": {
        "lat": 15.3173, "lng": 75.7139
      }
    },
    {
      "name": "Kerala",
      "position": {
        "lat": 10.850516, "lng": 76.271080
      }
    },
    {
      "name": "Lakshadweep",
      "position": {
        "lat": 13.6999972 , "lng": 72.1833326
      }
    },
    {
      "name": "Madhya Pradesh",
      "position": {
        "lat": 23.473324, "lng": 77.947998
      }
    },
    {
      "name": "Maharashtra",
      "position": {
        "lat":  19.7515, "lng": 75.7139
      }
    },
    {
      "name": "Manipur",
      "position": {
        "lat": 24.6637, "lng": 93.9063
      }
    },
    {
      "name": "Meghalaya",
      "position": {
        "lat": 25.4670, "lng": 91.3662
      }
    },
    {
      "name": "Mizoram",
      "position": {
        "lat": 23.1645, "lng": 92.9376
      }
    },
    {
      "name": "Nagaland",
      "position": {
        "lat": 26.1584, "lng": 94.5624
      }
    },
    {
      "name": "Orissa",
      "position": {
        "lat": 20.9517, "lng": 85.0985
      }
    },
    {
      "name": "Pondicherry",
      "position": {
        "lat": 11.9139, "lng": 79.8145
      }
    },
    {
      "name": "Punjab",
      "position": {
        "lat": 31.1471, "lng": 75.3412
      }
    },
    {
      "name": "Rajasthan",
      "position": {
        "lat": 27.0238, "lng": 74.2179
      }
    },
    {
      "name": "Sikkim",
      "position": {
        "lat": 27.5330, "lng": 88.5122
      }
    },
    {
      "name": "Tamil Nadu",
      "position": {
        "lat": 11.1271, "lng": 78.6569
      }
    },
    {
      "name": "Tripura",
      "position": {
        "lat": 23.9408, "lng": 91.9882
      }
    },
    {
      "name": "Uttarakhand",
      "position": {
        "lat": 30.0668 ,"lng": 79.0193
      }
    },
    {
      "name": "Uttar Pradesh",
      "position": {
        "lat": 26.8467, "lng": 80.9462
      }
    },
    {
      "name": "West Bengal",
      "position": {
        "lat": 22.9868, "lng": 87.8550
      }
    }];

  markers = [];
  victimsMarkers = [];
  investigatorsMarkers = [];
  polisStationMarkers = [];
  hospitalMarkers = [];
  eZonesMarkers = [];
  landMarkMarkers = [];
  // this.refreshGeoxmanData();
  // this.refreshPoliceStationsData();
  // this.refreshHospitalData();
  // this.refreshLandmarkData();
  // this.refreshEZonesData();

  selectedMediaData = {
    audios: [],
    images: [],
    videos: []
  };

  constructor(private zone: NgZone,
    private locationService: LocationService,
    private parseService: ParseService
  ) { }


  createMarker(place, isLastMarker?: boolean) {

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
    if (isLastMarker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      this.map.setCenter({ lat: place.lat, lng: place.lng });
    }

    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
      this.openMediaData(marker);
    });
    marker.set('fbId', place.fbID);
    this.markers.push(marker);
  }

  setCenterRegion(latLng) {
    console.log('Setting center ', this.selectedState);
    this.map.setCenter(this.selectedState.position);
    google.maps.event.trigger(this.map, 'resize');
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
          this.selectedMediaData.audios = data.reverse();
        });

      });
      // Video Data
      this.locationService.getVideos(marker.fbId).then((data) => {
        console.log("VideoData >> ", data);
        this.zone.run(() => {
          this.selectedMediaData.videos = data.reverse();
        });
      });
      // Image Data
      this.locationService.getImages(marker.fbId).then((data) => {
        console.log("ImagData >> ", data);
        this.zone.run(() => {
          this.selectedMediaData.images = data.reverse();
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
    this.victimsMarkers.push(marker);
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
    this.polisStationMarkers.push(marker);
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
    this.hospitalMarkers.push(marker);
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
    this.landMarkMarkers.push(marker);
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
    this.eZonesMarkers.push(marker);
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
    this.parseService.startSubscription().subscribe((data) => {
      console.log(' refreshVictimeData called ############################ ');
      this.refreshVictimeData();
    });

    this.loadUnsafeZones();
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
      console.log('Unsafe Zones Data ', unsafeZones);
      this.markUnsafeZones(unsafeZones);
    });
  }


  markUnsafeZones(unsafeZones) {
    // Construct the circle for each value in unsafezone.
    unsafeZones.forEach(zone => {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: { lat: zone['lat'], lng: zone['lng'] },
        radius: zone['radius'] * 1
      });
    });
  }


  refreshVictimeData() {
    this.locationService.getAllVictims().then((locations) => {
      locations = _.sortBy(locations, (o) => { return moment(o.date); });
      for (var i = 0; i < locations.length; i++) {
        this.createMarker(locations[i], i === locations.length - 1);
      }
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(this.map, this.markers, {
        gridSize: 50,
        styles: [{
          textColor: 'white',
          url: 'assets/images/victim_red_icon_cluster52x52.png',
          height: 50,
          width: 50
        }],
        maxZoom: 15
      });
      this.refreshGeoxmanData();
      this.refreshPoliceStationsData();
      this.refreshHospitalData();
      this.refreshLandmarkData();
      this.refreshEZonesData();
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
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(this.map, this.investigatorsMarkers, {
        gridSize: 50,
        styles: [{
          textColor: 'white',
          url: 'assets/images/investigator_clutser52x52.png',
          height: 50,
          width: 50
        }],
        maxZoom: 15
      });
    });
  }

  refreshPoliceStationsData() {
    this.locationService.getAllPoliceStations().then((locations) => {
      // console.log('PoliceStationsdata is here :: ', locations);
      for (var i = 0; i < locations.length; i++) {
        this.createPoliceStationMarker(locations[i]);
      }
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(this.map, this.polisStationMarkers, {
        gridSize: 50,
        styles: [{
          textColor: 'white',
          url: 'assets/images/police_station_cluster52x52.png',
          height: 50,
          width: 50
        }],
        maxZoom: 15
      }
      );
    });
  }

  refreshHospitalData() {
    this.locationService.getAllHospitals().then((geospot) => {
      // console.log('Hospitalsdata is here :: ', geospot);
      for (var i = 0; i < geospot.length; i++) {
        this.createHospitalMarker(geospot[i]);
      }
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(this.map, this.hospitalMarkers, {
        gridSize: 50,
        styles: [{
          textColor: 'white',
          url: 'assets/images/hospital_cluster52x52.png',
          height: 50,
          width: 50
        }],
        maxZoom: 15
      }
      );

    });
  }

  refreshLandmarkData() {
    this.locationService.getAllLandmarks().then((latlong) => {
      // console.log('Landmarksdata is here :: ', latlong);
      for (var i = 0; i < latlong.length; i++) {
        this.createLandmaeksMarker(latlong[i]);
      }
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(this.map, this.landMarkMarkers, {
        gridSize: 50,
        styles: [{
          textColor: 'white',
          url: 'assets/images/landmark_cluster52x52.png',
          height: 50,
          width: 50
        }],
        maxZoom: 15
      }
      );

    });
  }

  refreshEZonesData() {
    this.locationService.getAllEZones().then((LONGITUDE) => {
      // console.log('EZonesdata is here :: ', LONGITUDE);
      for (var i = 0; i < LONGITUDE.length; i++) {
        this.createEZonesMarker(LONGITUDE[i]);
      }
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(this.map, this.eZonesMarkers, {
        gridSize: 50,
        styles: [{
          textColor: 'white',
          url: 'assets/images/safezone_cluster52x52.png',
          height: 50,
          width: 50
        }],
        maxZoom: 15
      });

    });
  }

}
