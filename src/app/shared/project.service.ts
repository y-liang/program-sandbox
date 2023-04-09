import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project, PROJECTS } from './projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  // getProjects(): Project[] {
  //   return PROJECTS;
  // }

  // have to make it observable to use subscribe
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

}
