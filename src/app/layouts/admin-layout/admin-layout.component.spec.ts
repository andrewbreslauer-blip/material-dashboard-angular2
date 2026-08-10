import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule, provideRouter } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { AdminLayoutComponent } from './admin-layout.component';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterModule],
      declarations: [ AdminLayoutComponent ],
      providers: [provideRouter([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
