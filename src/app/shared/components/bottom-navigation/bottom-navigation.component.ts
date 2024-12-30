import { AfterViewChecked, AfterViewInit, Component, inject, OnInit } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, RouterModule],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.css'
})
export class BottomNavigationComponent implements OnInit {
  visibleRoutes: string[] = ['/goals', '/finances', '/configs'];
  currentRouteHasMenu = false;
  routerSubscription!: Subscription;

  router = inject(Router);


  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouteHasMenu = this.visibleRoutes.includes(event.urlAfterRedirects || event.url);
      }
    });
  }
}
