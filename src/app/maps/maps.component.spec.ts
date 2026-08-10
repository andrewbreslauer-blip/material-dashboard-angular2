import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapsComponent } from './maps.component';

/**
 * MapsComponent talks to the Google Maps JS API, which index.html loads from a
 * script tag that is not present under karma, so the global is stubbed here.
 */
function stubGoogleMaps(): void {
  (window as unknown as { google: unknown }).google = {
    maps: {
      LatLng: class { },
      Map: class { },
      Marker: class { setMap() { /* noop */ } },
    },
  };
}

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(waitForAsync(() => {
    stubGoogleMaps();
    TestBed.configureTestingModule({
      declarations: [ MapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
