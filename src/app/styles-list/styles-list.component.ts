import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SetFavoriteStyles } from '../actions/projects.actions';
import { State } from '../models/projectState.model';
import { Style } from '../models/style.model';
import { styles } from './styles';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import differenceBy from 'lodash.differenceby';

@Component({
  selector: 'app-styles-list',
  templateUrl: './styles-list.component.html',
  styleUrls: ['./styles-list.component.scss']
})

export class StylesListComponent implements OnInit {
  state$: Observable<State>;
  styles: Style[] = styles;
  favoriteStyles: Style[];
  filteredStyles$: Observable<Style[]>;

  constructor(private store: Store<({projectStore: State})>) {
    this.state$ = store.pipe(select('projectStore'));
    this.state$.subscribe(state => {
      this.favoriteStyles = state.favoriteStyles;
      this.styles = differenceBy(this.styles, this.favoriteStyles, 'value')
    }).unsubscribe();
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.store.dispatch(new SetFavoriteStyles(this.favoriteStyles));
  }

}
