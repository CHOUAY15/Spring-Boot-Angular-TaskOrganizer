// Angular Import
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// project import
import { NavigationItem, getNavigationItems } from 'src/app/theme/layouts/admin-layout/navigation/navigation';

// icons
import { IconModule, IconService } from '@ant-design/icons-angular';
import { GlobalOutline, NodeExpandOutline } from '@ant-design/icons-angular/icons';

// services
import { AuthenticationService } from 'src/app/core/services/authentication.service';

interface titleType {
  url: any;
  title: string;
  breadcrumbs: unknown;
  type: string;
  link?: string | undefined;
  description?: string | undefined;
  path?: string | undefined;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, IconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  // public props
  @Input() type: string;
  @Input() dashboard = true;
  @Input() Component = false;

  navigations: NavigationItem[];
  breadcrumbList: Array<string> = [];
  navigationList!: titleType[];

  // constructor
  constructor(
    private route: Router,
    private titleService: Title,
    private iconService: IconService,
    private authService: AuthenticationService
  ) {
    this.type = 'theme1';
    this.iconService.addIcon(...[GlobalOutline, NodeExpandOutline]);
  }

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    this.navigations = getNavigationItems(userRole);
    this.setBreadcrumb();
  }

  // public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        this.navigationList = breadcrumbList;
        const title = breadcrumbList[breadcrumbList.length - 1]?.title || '';
        this.titleService.setTitle(title + ' | TaskMaster');
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): titleType[] {
    for (const navItem of navItems) {
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            link: navItem.link,
            description: navItem.description,
            path: navItem.path,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            link: navItem.link,
            path: navItem.path,
            description: navItem.description,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
  }
}