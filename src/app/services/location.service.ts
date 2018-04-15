import { Injectable } from '@angular/core';
import * as Parse from 'parse';
// Get your favorite AsyncStorage handler with import (ES6) or require
import { AsyncStorage } from 'react-native';
import { debug } from 'util';


@Injectable()
export class LocationService {

  parse = require('parse');

  constructor() { }

  // Initialize parse server
  initializeParseServer() {
    let url = 'http://103.224.247.55:1001/parse';
    this.parse.initialize("family11");
    this.parse.serverURL = url;
  }

  getAllVictims(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var allVictims = Parse.Object.extend("AllVictims");
      var query = new Parse.Query(allVictims);

      query.find({
        success: function (results) {
          // debugger;
          var victimList = [];
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var victim = {
              vname: object.get("name"),
              userContact: object.get("userContact"),
              date: object.get("updatedAt"),
              fbID: object.get("fbID"),
              lat: object.get("location").latitude,
              lng: object.get("location").longitude
            }
            victimList.push(victim);
            if (results.length - 1 === i) {
              return resolve(victimList);
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }


  getAllGeoXman(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var allGeoXman = Parse.Object.extend("GeoXman");
      var query = new Parse.Query(allGeoXman);

      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var geoxmanList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var geoxman = {
                XManID: object.get("XManID"),
                XManName: object.get("XManName"),
                XManType: object.get("XManType"),
                XManContactNum: object.get("XManContactNum"),
                ZoneID: object.get("ZoneID"),
                ZoneName: object.get("ZoneName"),
                XManFacebookID: object.get("XManFacebookID"),
                XManVehicleNo: object.get("XManVehicleNo"),
                XManAddress: object.get("XManAddress"),
                City: object.get("City"),
                State: object.get("state"),
                lat: object.get("location").latitude,
                lng: object.get("location").longitude
              }
              geoxmanList.push(geoxman);
              if (results.length - 1 === i) {
                return resolve(geoxmanList);
              }
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }

  getAllPoliceStations(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var allPoliceStations = Parse.Object.extend("PoliceStations");
      var query = new Parse.Query(allPoliceStations);

      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var policeStationsList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var policestations = {
                name: object.get("name"),
                address: object.get("address"),
                state: object.get("state"),
                lat: object.get("location").latitude,
                lng: object.get("location").longitude
              }
              policeStationsList.push(policestations);
              if (results.length - 1 === i) {
                return resolve(policeStationsList);
              }
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }

  getAllHospitals(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var allHospitals = Parse.Object.extend("Hospitals");
      var query = new Parse.Query(allHospitals);

      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var hospitalsList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var hospitals = {
                Name: object.get("Name"),
                //  address: object.get("address"),
                //  state: object.get("state"),
                lat: object.get("geospot")[1],
                lng: object.get("geospot")[0]
              }
              hospitalsList.push(hospitals);
              if (results.length - 1 === i) {
                return resolve(hospitalsList);
              }
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }
  getAllLandmarks(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var allLandmarks = Parse.Object.extend("Landmarks");
      var query = new Parse.Query(allLandmarks);

      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var landmarksList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var landmarks = {
                name: object.get("name"),
                //  address: object.get("address"),
                //  state: object.get("state"),
                lat: object.get("latlong")[1],
                lng: object.get("latlong")[0]
              }
              landmarksList.push(landmarks);
              if (results.length - 1 === i) {
                return resolve(landmarksList);
              }
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }

  // get all safe zones
  getAllEZones(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var allEZones = Parse.Object.extend("EZones");
      var query = new Parse.Query(allEZones);

      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var ezonesList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var ezones = {
                TAHSIL: object.get("TAHSIL"),
                DISTRICT: object.get("DISTRICT"),
                STATE: object.get("STATE"),
                EMAIL: object.get("EMAIL"),
                lat: object.get("LATITUDE"),
                lng: object.get("LONGITUDE")
              }
              ezonesList.push(ezones);
              if (results.length - 1 === i) {
                return resolve(ezonesList);
              }
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }

  // get all safe zones
  loadUnsafeZones(): Promise<any[]> {

    return new Promise((resolve, reject) => {

      var unsafeZones = Parse.Object.extend("UnsafeZones");
      var query = new Parse.Query(unsafeZones);

      query.find({
        success: function (results) {
          if (results.length > 0) {
            var unsafeZonesList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var ezones = {
                address: object.get("address"),
                name: object.get("name"),
                zoneName: object.get("zoneName"),
                radius: object.get("radious"),
                lat: object.get("location")._latitude,
                lng: object.get("location")._longitude
              }
              unsafeZonesList.push(ezones);
              if (results.length - 1 === i) {
                return resolve(unsafeZonesList);
              }
            }
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }


  createEZoneswindow(data) {
    var contentString = '<div id="content">' +
      //'<h4 id="firstHeading" class="firstHeading">XMan ID:- ' + data.XManID + '</h4>' +
      '<h5 id="firstHeading" class="firstHeading">TAHSIL:- ' + data.TAHSIL + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">DISTRICT:- ' + data.DISTRICT + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">STATE:- ' + data.STATE + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">EMAIL:- ' + data.EMAIL + '</h5>' +
      '</div>';
    // '<img src="' + data.image + '" alt="Mountain View" width="250" height="250" controls>' +
    // '<video width="300" height="150" controls>' +
    // '<source src="' + data.video + '" type="video/mp4">' +
    // '<source src="' + data.video + '" type="video/ogg">' +
    return contentString;

  }



  createLandmarkswindow(data) {
    var contentString = '<div id="content">' +
      //'<h4 id="firstHeading" class="firstHeading">XMan ID:- ' + data.XManID + '</h4>' +
      '<h5 id="firstHeading" class="firstHeading">Name:- ' + data.name + '</h5>' +
      //  '<h5 id="firstHeading" class="firstHeading">Address.:- ' + data.address + '</h5>' +
      //  '<h5 id="firstHeading" class="firstHeading">State:- ' + data.state + '</h5>' +
      '</div>';
    // '<img src="' + data.image + '" alt="Mountain View" width="250" height="250" controls>' +
    // '<video width="300" height="150" controls>' +
    // '<source src="' + data.video + '" type="video/mp4">' +
    // '<source src="' + data.video + '" type="video/ogg">' +
    return contentString;

  }


  createHospitalswindow(data) {
    var contentString = '<div id="content">' +
      //'<h4 id="firstHeading" class="firstHeading">XMan ID:- ' + data.XManID + '</h4>' +
      '<h5 id="firstHeading" class="firstHeading">Name:- ' + data.Name + '</h5>' +
      //  '<h5 id="firstHeading" class="firstHeading">Address.:- ' + data.address + '</h5>' +
      //  '<h5 id="firstHeading" class="firstHeading">State:- ' + data.state + '</h5>' +
      '</div>';
    // '<img src="' + data.image + '" alt="Mountain View" width="250" height="250" controls>' +
    // '<video width="300" height="150" controls>' +
    // '<source src="' + data.video + '" type="video/mp4">' +
    // '<source src="' + data.video + '" type="video/ogg">' +
    return contentString;

  }

  createPoliceStationswindow(data) {
    var contentString = '<div id="content">' +
      //'<h4 id="firstHeading" class="firstHeading">XMan ID:- ' + data.XManID + '</h4>' +
      '<h5 id="firstHeading" class="firstHeading">Name:- ' + data.name + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">Address.:- ' + data.address + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">State:- ' + data.state + '</h5>' +
      '</div>';
    // '<img src="' + data.image + '" alt="Mountain View" width="250" height="250" controls>' +
    // '<video width="300" height="150" controls>' +
    // '<source src="' + data.video + '" type="video/mp4">' +
    // '<source src="' + data.video + '" type="video/ogg">' +
    return contentString;

  }



  createGeoXmanwindow(data) {
    var contentString = '<div id="content">' +
      //'<h4 id="firstHeading" class="firstHeading">XMan ID:- ' + data.XManID + '</h4>' +
      '<h5 id="firstHeading" class="firstHeading">Name:- ' + data.XManName + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">Contact No.:- ' + data.XManContactNum + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">XMan Type:- ' + data.XManType + '</h5>' +
      '</div>';
    // '<img src="' + data.image + '" alt="Mountain View" width="250" height="250" controls>' +
    // '<video width="300" height="150" controls>' +
    // '<source src="' + data.video + '" type="video/mp4">' +
    // '<source src="' + data.video + '" type="video/ogg">' +
    return contentString;

  }

  createContentWindow(data) {
    var contentString = '<div id="content">' +
      // '<h4 id="firstHeading" class="firstHeading">Victim No.:- ' + data.fbID + '</h4>' +
      '<h5 id="firstHeading" class="firstHeading">Name:- ' + data.vname + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">Contact No.:- ' + data.userContact + '</h5>' +
      '<h5 id="firstHeading" class="firstHeading">Date:- ' + data.date + '</h5>' +
      '</div>';
    // '<img src="' + data.image + '" alt="Mountain View" width="250" height="250" controls>' +
    // '<video width="300" height="150" controls>' +
    // '<source src="' + data.video + '" type="video/mp4">' +
    // '<source src="' + data.video + '" type="video/ogg">' +
    return contentString;
  }

  getAudios(fbID: number): Promise<any[]> {

    return new Promise((resolve, reject) => {

      let audioCollection = Parse.Object.extend('EmergencyAudio');
      var query = new Parse.Query(audioCollection);
      query.equalTo('fbID', fbID);
      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var audioList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var audio = {
                audio_url: object.get("AudioFile").url(),
                name: object.get("AudioName"),
                date: object.get("date")
              }
              audioList.push(audio);
              if (results.length - 1 === i) {
                return resolve(audioList);
              }
            }
          } else {
            return resolve([]);
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });

    });

  }


  getVideos(fbID: number): Promise<any[]> {

    return new Promise((resolve, reject) => {

      let videoCollection = Parse.Object.extend('EmergencyVideo');
      var query = new Parse.Query(videoCollection);
      query.equalTo('fbID', fbID);
      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var videoList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var video = {
                video_url: "",
                name: object.get("VideoName"),
                date: object.get("date")
              };
              videoList.push(video);
              if (results.length - 1 === i) {
                return resolve(videoList);
              }
            }
          } else {
            return resolve([]);
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });
    });

  }

  getImages(fbID: number): Promise<any[]> {

    return new Promise((resolve, reject) => {

      let imageCollection = Parse.Object.extend('EmergencyImage');
      var query = new Parse.Query(imageCollection);
      query.equalTo('fbID', fbID);
      query.find({
        success: function (results) {
          // debugger;
          if (results.length > 0) {
            var imageList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var image = {
                photo_medium_url: object.get("photo_medium_url"),
                photo_thumb_url: object.get("photo_thumb_url"),
                photo_url: object.get("photo_url"),
                date: object.get('date')
              };
              imageList.push(image);
              if (results.length - 1 === i) {
                return resolve(imageList);
              }
            }
          } else {
            return resolve([]);
          }
        },
        error: function (error) {
          console.log("Error: " + error.code + " " + error.message);
          return reject(error);
        }
      });
    });

  }

  // For testing
  saveData() {

    // Simple syntax to create a new subclass of Parse.Object.
    var GameScore = Parse.Object.extend("GameScore");
    // Create a new instance of that class.
    var gameScore = new GameScore();
    gameScore.set("score", 1337);
    gameScore.set("playerName", "Sean Plott");
    gameScore.set("cheatMode", false);

    gameScore.save(null, {
      success: function (gameScore) {
        // Execute any logic that should take place after the object is saved.
        // alert('New object created with objectId: ' + gameScore.id);
      },
      error: function (gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        // alert('Failed to create new object, with error code: ' + error.message);
      }
    });


  }
  createSubsrciption() {

  }
}
