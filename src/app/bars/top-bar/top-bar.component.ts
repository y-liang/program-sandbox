import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  squares: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

  constructor() { }

  ngOnInit() {
  }

}
