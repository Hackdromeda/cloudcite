import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SetStyle } from '../actions/projects.actions';
import { State } from '../models/projectState.model';
import { Style } from '../models/style.model';

@Component({
  selector: 'app-style-select',
  templateUrl: './style-select.component.html',
  styleUrls: ['./style-select.component.scss']
})
export class StyleSelectComponent implements OnInit {
  state$: Observable<State>;
  favoriteStyles: Style[];
  selectedStyle: Style;

  constructor(private store: Store<({projectStore: State})>) {
    this.state$ = store.pipe(select('projectStore'));
    this.state$.subscribe(state => {
      this.favoriteStyles = state.favoriteStyles;
      this.selectedStyle = state.projects.find(project => project.id == state.selectedProject).style;
    }).unsubscribe();
  }

  ngOnInit() {
  }

  updateStyle() {
    this.state$.subscribe(state => {
      this.store.dispatch(new SetStyle(state.selectedProject, this.selectedStyle));
    }).unsubscribe();
  }

}
