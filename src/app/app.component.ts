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
  position: any;
  selectedState: any;

  showVictimeData = false;
  showGeoxmanData = false;
  showPoliceData = false;
  showLandmarkData = false;
  showEzoneData = false;
  showHospitalData = false;
  showCCTVData = false;

  regionData = [{
    "name": "Andaman",
    "position": {
      "lat": 11.7401, "lng": 92.6586
    }
  },
  {
    "name": "Andhra Pradesh",
    "position": {
      "lat": 17.729830, "lng": 83.321495
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
      "lat": 30.741482, "lng": 76.768066
    }
  },
  {
    "name": "Chhattisgarh",
    "position": {
      "lat": 21.295132, "lng": 81.828232
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
      "lat": 13.6999972, "lng": 72.1833326
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
      "lat": 19.7515, "lng": 75.7139
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
      "lat": 30.0668, "lng": 79.0193
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
  geoXmanMarkers = [];
  investigatorsMarkers = [];
  polisStationMarkers = [];
  hospitalMarkers = [];
  eZonesMarkers = [];
  landMarkMarkers = [];
  CCTVMarkers = [];

  selectedMediaData = {
    audios: [],
    images: [],
    videos: []
  };

  constructor(private zone: NgZone,
    private locationService: LocationService,
    private parseService: ParseService
  ) { }

  toggleCCTVData() {
    this.showCCTVData = !this.showCCTVData;
    if (this.showCCTVData) {
      for (var i = 0; i < this.CCTVMarkers.length; i++) {
        this.CCTVMarkers[i].setMap(null);
        if (this.CCTVMarkers.length === i + 1) {
          this.CCTVMarkers = [];
        }
      }
    } else {
      this.refreshCCTVData();
    }

  };

  toggleVictimeData() {
    this.showVictimeData = !this.showVictimeData;
    if (this.showVictimeData) {
      for (var i = 0; i < this.victimsMarkers.length; i++) {
        this.victimsMarkers[i].setMap(null);
        if (this.victimsMarkers.length === i + 1) {
          this.victimsMarkers = [];
        }
      }
    } else {
      this.refreshVictimeData();
    }
  };

  toggleGeoxmanData() {
    this.showGeoxmanData = !this.showGeoxmanData;
    if (this.showGeoxmanData) {
      for (var i = 0; i < this.geoXmanMarkers.length; i++) {
        this.geoXmanMarkers[i].setMap(null);
        if (this.geoXmanMarkers.length === i + 1) {
          this.geoXmanMarkers = [];
        }
      }
    } else {
      this.refreshGeoxmanData();
    }

  };

  togglePoliceData() {
    this.showPoliceData = !this.showPoliceData;
    if (this.showPoliceData) {
      for (var i = 0; i < this.polisStationMarkers.length; i++) {
        this.polisStationMarkers[i].setMap(null);
        if (this.polisStationMarkers.length === i + 1) {
          this.polisStationMarkers = [];
        }
      }
    } else {
      this.refreshPoliceStationsData();
    }

  };

  toggleLandmarkData() {
    this.showLandmarkData = !this.showLandmarkData;
    if (this.showLandmarkData) {
      for (var i = 0; i < this.landMarkMarkers.length; i++) {
        this.landMarkMarkers[i].setMap(null);
        if (this.landMarkMarkers.length === i + 1) {
          this.landMarkMarkers = [];
        }
      }
    } else {
      this.refreshLandmarkData();
    }

  };


  toggleEzoneData() {
    this.showEzoneData = !this.showEzoneData;
    if (this.showEzoneData) {
      for (var i = 0; i < this.eZonesMarkers.length; i++) {
        this.eZonesMarkers[i].setMap(null);
        if (this.eZonesMarkers.length === i + 1) {
          this.eZonesMarkers = [];
        }
      }
    } else {
      this.refreshEZonesData();
    }

  };

  
 

  toggleHospitalData() {
    this.showHospitalData = !this.showHospitalData;
    if (this.showHospitalData) {
      for (var i = 0; i < this.hospitalMarkers.length; i++) {
        this.hospitalMarkers[i].setMap(null);
        if (this.hospitalMarkers.length === i + 1) {
          this.hospitalMarkers = [];
        }
      }

    } else {
      this.refreshHospitalData();
    }
  };


  clearMarker() {
    return
  }


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
      this.openNav();
      this.openMediaData(marker);
    });
    marker.set('fbId', place.fbID);

    this.victimsMarkers.push(marker);
  }

  setCenterRegion() {
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
    this.geoXmanMarkers.push(marker);
  }

  createCCTVMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: this.locationService.createCCTVwindow(place)
    });
    const icon = {
      url: './assets/images/hospital.png',
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
    this.CCTVMarkers.push(marker);
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
    this.loadMarkes();
    // Initialize subscription
    this.parseService.initialize();

    // Create subscription
    this.parseService.startSubscription().subscribe((data) => {
    
      this.loadMarkes();
    });

    this.loadUnsafeZones();
  }

  loadMarkes() {
    this.refreshVictimeData();
    this.refreshGeoxmanData();
    this.refreshPoliceStationsData();
    this.refreshHospitalData();
    this.refreshLandmarkData();
    this.refreshEZonesData();
    this.refreshCCTVData();
  }

  initialize() {

    var myLatlng = new google.maps.LatLng(18.5204, 73.8567);

    var mapOptions = {
      zoom: 13,
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

    let prms = new Promise((resolve, reject) => {
      if (this.victimsMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.victimsMarkers.length; i++) {
        this.victimsMarkers[i].setMap(null);
        if (this.victimsMarkers.length === i + 1) {
          this.victimsMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {

      this.locationService.getAllVictims().then((locations) => {
        locations = _.sortBy(locations, (o) => { return moment(o.date); });
        for (var i = 0; i < locations.length; i++) {
          console.log(' i ', location[i]);
          this.createMarker(locations[i], i === locations.length - 1);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.markers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/victim_red_icon_cluster52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });
      });

    });

  }

  ngOnDestroy() {
    this.parseService.stopUpdate()
  }

  refreshGeoxmanData() {

    let prms = new Promise((resolve, reject) => {
      if (this.geoXmanMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.geoXmanMarkers.length; i++) {
        this.geoXmanMarkers[i].setMap(null);
        if (this.geoXmanMarkers.length === i + 1) {
          this.geoXmanMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {

      this.locationService.getAllGeoXman().then((locations) => {
        for (var i = 0; i < locations.length; i++) {
          this.createGeoXmanMarker(locations[i]);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.investigatorsMarkers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/investigator_clutser52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });
      });
    });
  }

  refreshCCTVData() {

    let prms = new Promise((resolve, reject) => {
      if (this.CCTVMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.CCTVMarkers.length; i++) {
        this.CCTVMarkers[i].setMap(null);
        if (this.CCTVMarkers.length === i + 1) {
          this.CCTVMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {

      this.locationService.getAllCCTV().then((locations) => {
console.log("aaaa",locations);

        for (var i = 0; i < locations.length; i++) {
          this.createCCTVMarker(locations[i]);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.investigatorsMarkers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/investigator_clutser52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });
      });
    });
  }

  refreshPoliceStationsData() {

    let prms = new Promise((resolve, reject) => {
      if (this.polisStationMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.polisStationMarkers.length; i++) {
        this.polisStationMarkers[i].setMap(null);
        if (this.polisStationMarkers.length === i + 1) {
          this.polisStationMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {


      this.locationService.getAllPoliceStations().then((locations) => {
        for (var i = 0; i < locations.length; i++) {
          this.createPoliceStationMarker(locations[i]);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.polisStationMarkers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/police_station_cluster52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });
      });
    });
  }

  refreshHospitalData() {

    let prms = new Promise((resolve, reject) => {
      if (this.hospitalMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.hospitalMarkers.length; i++) {
        this.hospitalMarkers[i].setMap(null);
        if (this.hospitalMarkers.length === i + 1) {
          this.hospitalMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {

      this.locationService.getAllHospitals().then((geospot) => {
        for (var i = 0; i < geospot.length; i++) {
          this.createHospitalMarker(geospot[i]);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.hospitalMarkers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/hospital_cluster52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });

      });
    });
  }

  refreshLandmarkData() {

    let prms = new Promise((resolve, reject) => {
      if (this.landMarkMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.landMarkMarkers.length; i++) {
        this.landMarkMarkers[i].setMap(null);
        if (this.landMarkMarkers.length === i + 1) {
          this.landMarkMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {

      this.locationService.getAllLandmarks().then((latlong) => {
        for (var i = 0; i < latlong.length; i++) {
          this.createLandmaeksMarker(latlong[i]);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.landMarkMarkers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/landmark_cluster52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });

      });
    });
  }

  refreshEZonesData() {

    let prms = new Promise((resolve, reject) => {
      if (this.eZonesMarkers.length === 0) {
        return resolve();
      }
      for (var i = 0; i < this.eZonesMarkers.length; i++) {
        this.eZonesMarkers[i].setMap(null);
        if (this.eZonesMarkers.length === i + 1) {
          this.eZonesMarkers = [];
          return resolve();
        }
      }
    });

    prms.then(() => {

      this.locationService.getAllEZones().then((LONGITUDE) => {
        for (var i = 0; i < LONGITUDE.length; i++) {
          this.createEZonesMarker(LONGITUDE[i]);
        }
        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(this.map, this.eZonesMarkers, {
        //   gridSize: 50,
        //   styles: [{
        //     textColor: 'white',
        //     url: 'assets/images/safezone_cluster52x52.png',
        //     height: 50,
        //     width: 50
        //   }],
        //   maxZoom: 15
        // });

      });
    });
  }

  /* Open the sidenav */
  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  /* Close/hide the sidenav */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  getVodeoUrl() {
    return 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
  }


}
