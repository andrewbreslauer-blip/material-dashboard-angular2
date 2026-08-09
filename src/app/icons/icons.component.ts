import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class IconsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
