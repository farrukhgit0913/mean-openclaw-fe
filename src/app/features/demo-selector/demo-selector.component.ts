import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-selector',
  imports: [
    RouterLink,
  ],
  templateUrl: './demo-selector.component.html',
  styleUrl: './demo-selector.component.scss'
})
export class DemoSelectorComponent {}