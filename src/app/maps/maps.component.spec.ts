import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapsComponent } from './maps.component';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeAll(() => {
    // The Google Maps JS API is loaded from index.html at runtime and is not
    // available in unit tests, so stub the parts the component uses.
    (window as any).google = {
      maps: {
        LatLng: class { constructor(public lat: number, public lng: number) {} },
        Map: class { constructor(public el: HTMLElement | null, public options: unknown) {} },
        Marker: class {
          constructor(public options: unknown) {}
          setMap(_map: unknown) {}
        },
      },
    };
  });

  afterAll(() => {
    delete (window as any).google;
  });

  beforeEach(waitForAsync(() => {
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
