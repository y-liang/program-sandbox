import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit {
  colors: string[] = ['blurple', 'lighter', 'light', 'medium', 'dark', 'darker']
  subColors: string[] = ['yellower', 'yellow', 'green', 'greener', 'pink', 'dark']

  constructor() { }

  ngOnInit(): void {
  }

}
