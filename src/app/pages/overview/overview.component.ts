import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/projects';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  projects: Project[];

  modes: string[] = ['dark', 'light'];
  mode: string | undefined;

  currentMode;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);


    // console.log('this.currentMode');
    // console.log(this.currentMode);

    this.currentMode = localStorage.getItem('mode') ? localStorage.getItem('mode') : null;
    this.mode = this.currentMode ? this.currentMode : this.modes[1];
  }

  toggleMode() {
    if (this.mode == this.modes[0]) {
      this.mode = this.modes[1];
      localStorage.setItem('mode', 'light');
    } else {
      this.mode = this.modes[0];
      localStorage.setItem('mode', 'dark');
    }


    console.log(this.mode);
    console.log('this.currentMode');
    console.log(this.currentMode);
  }

}
