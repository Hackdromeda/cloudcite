import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateProject, SelectProject, DeleteProject} from '../actions/projects.actions';
import { State } from '../models/projectState.model';
import { Style } from '../models/style.model';
import { StylesListComponent } from '../styles-list/styles-list.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  state$: Observable<State>;
  favoriteStyles: Style[];
  newProjectSelectedStyle: Style;
  
  constructor(private store: Store<({projectStore: State})>) {
    this.state$ = store.pipe(select('projectStore'));
    this.state$.subscribe(state => {
      this.favoriteStyles = state.favoriteStyles;
      this.newProjectSelectedStyle = state.projects.find(project => project.id == state.selectedProject).style;
    }).unsubscribe();
  }

  ngOnInit() {
  }

  createProject() {
    this.store.dispatch(new CreateProject({
        "id": window.crypto.getRandomValues(new Uint32Array(3)).join(''),
        "title": 'New Project',
        "citations": [],
        "style": this.newProjectSelectedStyle
    }));
  }

  deleteProject(id: string) {
    this.store.dispatch(new DeleteProject(id));
  }

  selectProject(id: string) {
    this.store.dispatch(new SelectProject(id));
  }

}
