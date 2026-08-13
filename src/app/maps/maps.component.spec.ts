import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsComponent } from './maps.component';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(waitForAsync(() => {
    // The Google Maps API is loaded from a script tag at runtime; stub it here.
    (window as any).google = {
      maps: {
        LatLng: class { constructor(public lat: number, public lng: number) {} },
        Map: class { setOptions() {} },
        Marker: class { setMap() {} }
      }
    };

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
