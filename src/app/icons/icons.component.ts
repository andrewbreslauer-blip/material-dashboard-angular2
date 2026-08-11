import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class IconsComponent {

  constructor() { }

}
