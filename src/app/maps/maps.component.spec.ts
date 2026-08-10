import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsComponent } from './maps.component';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;
  let originalGoogle: unknown;

  beforeEach(() => {
    originalGoogle = (window as unknown as { google?: unknown }).google;
    (window as unknown as { google: unknown }).google = {
      maps: {
        LatLng: class {},
        Map: class { setOptions() {} },
        Marker: class { setMap() {} },
        MapTypeId: { ROADMAP: 'roadmap' },
        StyledMapType: class {},
      },
    };
  });

  afterEach(() => {
    (window as unknown as { google?: unknown }).google = originalGoogle;
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
