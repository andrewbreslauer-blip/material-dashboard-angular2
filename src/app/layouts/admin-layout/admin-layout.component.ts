import { Location, PopStateEvent } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter } from 'rxjs/operators';

import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private lastPoppedUrl: string | undefined;
  private readonly yScrollStack: number[] = [];
  private readonly scrollbars: PerfectScrollbar[] = [];

  ngOnInit(): void {
    const isWindows = navigator.platform.indexOf('Win') > -1;
    if (isWindows && !document.body.classList.contains('sidebar-mini')) {
      document.body.classList.add('perfect-scrollbar-on');
    } else {
      document.body.classList.remove('perfect-scrollbar-off');
    }

    const locationSubscription = this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.destroyRef.onDestroy(() => locationSubscription.unsubscribe());

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop() ?? 0);
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const elemMainPanel = this.mainPanel();
        const elemSidebar = this.sidebarWrapper();
        if (elemMainPanel) {
          elemMainPanel.scrollTop = 0;
        }
        if (elemSidebar) {
          elemSidebar.scrollTop = 0;
        }
        this.scrollbars.forEach(scrollbar => scrollbar.update());
      });
  }

  ngAfterViewInit(): void {
    if (this.usesPerfectScrollbar()) {
      const elemMainPanel = this.mainPanel();
      const elemSidebar = this.sidebarWrapper();
      if (elemMainPanel) {
        this.scrollbars.push(new PerfectScrollbar(elemMainPanel));
      }
      if (elemSidebar) {
        this.scrollbars.push(new PerfectScrollbar(elemSidebar));
      }
    }

    this.initFixedPlugin();

    this.destroyRef.onDestroy(() => {
      this.scrollbars.forEach(scrollbar => scrollbar.destroy());
      this.scrollbars.length = 0;
    });
  }

  private mainPanel(): HTMLElement | null {
    return document.querySelector<HTMLElement>('.main-panel');
  }

  private sidebarWrapper(): HTMLElement | null {
    return document.querySelector<HTMLElement>('.sidebar .sidebar-wrapper');
  }

  private usesPerfectScrollbar(): boolean {
    return window.matchMedia('(min-width: 960px)').matches && !this.isMac();
  }

  isMaps(path: string): boolean {
    return path !== this.location.prepareExternalUrl(this.location.path()).slice(1);
  }

  isMac(): boolean {
    const platform = navigator.platform.toUpperCase();
    return platform.indexOf('MAC') >= 0 || platform.indexOf('IPAD') >= 0;
  }

  /**
   * Wires up the sidebar colour / background picker rendered by the layout template.
   */
  private initFixedPlugin(): void {
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const sidebarResponsive = document.querySelector<HTMLElement>('body > .navbar-collapse');
    const sidebarImage = sidebar?.querySelector<HTMLElement>('.sidebar-background');

    if (window.innerWidth > 767) {
      const dropdown = document.querySelector('.fixed-plugin .dropdown');
      if (dropdown?.classList.contains('show-dropdown')) {
        dropdown.classList.add('open');
      }
    }

    document.querySelectorAll('.fixed-plugin a').forEach(link => {
      link.addEventListener('click', event => {
        if (link.classList.contains('switch-trigger')) {
          event.stopPropagation();
        }
      });
    });

    document.querySelectorAll<HTMLElement>('.fixed-plugin .badge').forEach(badge => {
      badge.addEventListener('click', () => {
        badge.parentElement?.querySelectorAll('.badge').forEach(sibling => sibling.classList.remove('active'));
        badge.classList.add('active');

        const newColor = badge.dataset['color'];
        if (!newColor) {
          return;
        }
        sidebar?.setAttribute('data-color', newColor);
        sidebarResponsive?.setAttribute('data-color', newColor);
      });
    });

    document.querySelectorAll<HTMLElement>('.fixed-plugin .img-holder').forEach(holder => {
      holder.addEventListener('click', () => {
        const item = holder.closest('li');
        item?.parentElement?.querySelectorAll('li').forEach(sibling => sibling.classList.remove('active'));
        item?.classList.add('active');

        const newImage = holder.querySelector('img')?.getAttribute('src');
        if (!newImage) {
          return;
        }

        this.fadeSwapBackground(sidebarImage, newImage);
        this.fadeSwapBackground(document.querySelector<HTMLElement>('.full-page-background'), newImage);
        if (sidebarResponsive) {
          sidebarResponsive.style.backgroundImage = `url("${newImage}")`;
        }
      });
    });
  }

  private fadeSwapBackground(element: HTMLElement | null | undefined, image: string): void {
    if (!element) {
      return;
    }

    element.style.transition = 'opacity 200ms ease';
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.backgroundImage = `url("${image}")`;
      element.style.opacity = '1';
    }, 200);
  }
}
