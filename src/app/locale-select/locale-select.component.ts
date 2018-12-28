import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SetLocale } from '../actions/projects.actions';
import { State } from '../models/projectState.model';
import { Locale } from '../models/locale.model';
import { locales } from './locales.js';

@Component({
  selector: 'app-locale-select',
  templateUrl: './locale-select.component.html',
  styleUrls: ['./locale-select.component.scss']
})
export class LocaleSelectComponent implements OnInit {
  state$: Observable<State>;
  locales: Locale[];
  selectedLocale: Locale;

  constructor(private store: Store<({projectStore: State})>) {
    this.locales = locales;
    this.state$ = store.pipe(select('projectStore'));
    this.state$.subscribe(state => {
      this.selectedLocale = state.locale;
    }).unsubscribe();
  }

  ngOnInit() {
  }

  updateLocale() {
    this.store.dispatch(new SetLocale(this.selectedLocale));
  }

}
