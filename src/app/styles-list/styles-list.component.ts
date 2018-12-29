import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddFavoriteStyle, RemoveFavoriteStyle } from '../actions/projects.actions';
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

  constructor(private store: Store<({projectStore: State})>) {
    this.state$ = store.pipe(select('projectStore'));
    this.state$.subscribe(state => {
      this.favoriteStyles = state.favoriteStyles;
      this.styles = differenceBy(this.styles, this.favoriteStyles, 'value')
    }).unsubscribe();
  }

  ngOnInit() {
  }

  checkIfSelected(style: string) {
    let favoriteStyles = this.favoriteStyles.reduce((accumulator, currentValue) => accumulator.concat([currentValue.value]), []);
    if (favoriteStyles.includes(style)) {
      return true;
    }
    else {
      return false;
    }
  }

  updateFavoriteStyles(style, selected) {
    let newStyle: Style =  {text: style.text, value: style.value};
    if (newStyle && selected) {
      this.store.dispatch(new AddFavoriteStyle(newStyle));
    }
    else if (newStyle && !selected) {
      this.store.dispatch(new RemoveFavoriteStyle(newStyle));
    }
  }

}
