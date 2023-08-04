import { Component, OnInit } from "@angular/core";
import { AuthenticationService, SurveyService, SurveyRewardService, AlertService, ProductService, RestService } from '../../../core/_services';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../../core/_models';
declare const google: any;
import * as moment from 'moment';

@Component({
  selector: 'card-map-product-stats',
  templateUrl: './card-map-product-stats.component.html',
  styleUrls: ['./card-map-product-stats.component.css']
})
export class CardMapProductStatsComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  myDate = new Date();
  scanStatistics: any;
  scanCords: any = [];
  heatmap: any;
  aWeekBefore = new Date(this.myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
  aMonthTime = new Date(this.myDate.getTime() + 60 * 60 * 24 * 30 * 1000);

  public filterOptions = {
    startDate: moment(this.aWeekBefore).format('YYYY-MM-DD'),
    endDate: moment(this.myDate).format('YYYY-MM-DD'),
    productId: "",
  };
  map: any;

  constructor(
    private productService: ProductService,
    private surveyrewardServices: SurveyRewardService,
    private _rest: RestService,
    private authenticationService: AuthenticationService,
  ) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.productService.statsFilter$.subscribe(data => {
      this.filterOptions = data;
      if (this.filterOptions)
        this.getProductScans()

      console.log('User value', this.filterOptions);
    });


  }

  ngOnInit(): void {
    this.initMap()
  }

  initMap(): void {
    let map = document.getElementById("map-canvas");
    this.getPosition().then(pos => {
      const mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(pos.lat, pos.lng),
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        styles: this.mapStyles,
        scaleControl: false,
      };

      this.map = new google.maps.Map(map, mapOptions);
    });


    navigator.permissions.query({
      name: 'geolocation'
    }).then(function (result) {
      if (result.state == 'granted') {
        console.log(result.state);
      } else if (result.state == 'prompt') {
        console.log(result.state);

      } else if (result.state == 'denied') {
        console.log(result.state);
      }
      result.onchange = function () {
        console.log(result.state);
      }
    });
  }



  getProductScans() {
    console.log('productId')
    this.productService.getProductScans(this.filterOptions.productId).pipe(first()).subscribe(data => {
      this.scanStatistics = data['data'];
      // console.log(data['data']);
      console.log(this.scanStatistics.length);

      if (this.scanStatistics.length < 1) {
        this.initMap()
      } else {
        this.convertLocations(this.scanStatistics);
      }
    });
  }

  convertLocations(locations) {
    console.log(455544)
    // this.map.clearOverlays();

    var n: number = locations.length;
    do {
      //  console.log(locations[n].scan_location); 
      if (locations[n] && locations[n].scan_location) {
        this.geoCode(locations[n].scan_location)
      }
      //  this.geoCode(locations[n].scan_location);
      n--;
      if (n == 0) {
        //  console.log(this.scanCords)
      }
    } while (n >= 0);
  }

  async geoCode(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == 'OK') {
        let cords = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() }
        let latLng = new google.maps.LatLng(cords.latitude, cords.longitude);

        this.scanCords.push(latLng);

        this.heatmap = new google.maps.visualization.HeatmapLayer({
          data: this.scanCords,
          map: this.map
        });
        return cords;

      }
    });
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  mapStyles = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#444444" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#adb7d6" }, { visibility: "on" }],
    },
  ]
}
