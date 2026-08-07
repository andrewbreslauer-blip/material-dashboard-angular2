import { Location } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ROUTES } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  readonly location = inject(Location);
  private readonly element = inject(ElementRef);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private toggleButton: HTMLElement | undefined;
  private sidebarVisible = false;
  private mobileMenuVisible = false;
  private closeLayer: HTMLElement | undefined;

  readonly title = signal(this.currentTitle());

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] as HTMLElement;

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.title.set(this.currentTitle());
        this.sidebarClose();
        this.removeCloseLayer();
      });
  }

  sidebarOpen(): void {
    setTimeout(() => this.toggleButton?.classList.add('toggled'), 500);
    document.body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    this.toggleButton?.classList.remove('toggled');
    document.body.classList.remove('nav-open');
    this.sidebarVisible = false;
  }

  sidebarToggle(): void {
    if (this.sidebarVisible) {
      this.sidebarClose();
    } else {
      this.sidebarOpen();
    }

    if (this.mobileMenuVisible) {
      document.body.classList.remove('nav-open');
      this.removeCloseLayer();
      setTimeout(() => this.toggleButton?.classList.remove('toggled'), 400);
      return;
    }

    setTimeout(() => this.toggleButton?.classList.add('toggled'), 430);
    this.addCloseLayer();
    document.body.classList.add('nav-open');
    this.mobileMenuVisible = true;
  }

  private currentTitle(): string {
    const path = this.location.prepareExternalUrl(this.location.path()).replace(/^#/, '');
    return ROUTES.find(route => route.path === path)?.title ?? 'Dashboard';
  }

  private addCloseLayer(): void {
    const layer = document.createElement('div');
    layer.setAttribute('class', 'close-layer');

    const host =
      document.getElementsByClassName('main-panel')[0] ??
      document.getElementsByClassName('wrapper-full-page')[0];
    host?.appendChild(layer);

    setTimeout(() => layer.classList.add('visible'), 100);
    layer.onclick = () => {
      document.body.classList.remove('nav-open');
      layer.classList.remove('visible');
      if (this.closeLayer === layer) {
        this.mobileMenuVisible = false;
      }
      setTimeout(() => {
        layer.remove();
        if (this.closeLayer === layer) {
          this.closeLayer = undefined;
        }
        this.toggleButton?.classList.remove('toggled');
      }, 400);
    };

    this.closeLayer = layer;
  }

  private removeCloseLayer(): void {
    (this.closeLayer ?? (document.getElementsByClassName('close-layer')[0] as HTMLElement))?.remove();
    this.closeLayer = undefined;
    this.mobileMenuVisible = false;
  }
}
