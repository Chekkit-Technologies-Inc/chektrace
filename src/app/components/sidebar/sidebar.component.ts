import { Component, OnInit } from "@angular/core";
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/_services';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  collapseShow = "hidden";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}


  // End open close
  ngOnInit() {
    const homeLink:RouteInfo = {
                      path: '/dashboard',
                      title: 'Overview',
                      icon: 'mdi mdi-home-outline',
                      class: '',
                      code:'3',
                      extralink: false,
                      submenu: []
                    };

    let allNavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);

    this.sidebarnavItems = allNavItems;

    // this.authenticationService.currentUserPlan.subscribe(data => {
    //         console.log(data.features)

    //     let plan = JSON.parse(data.features);
    //     // console.log(plan)
    //   // commented out till we implement subscription
    //     // this.sidebarnavItems = allNavItems.filter(({
    //     //   code
    //     // }) => plan.includes(code));
    //     this.sidebarnavItems = allNavItems;
    //     this.sidebarnavItems.unshift(homeLink);
    //   });

      // console.log(allNavItems)
      console.log(this.sidebarnavItems)

  }

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
