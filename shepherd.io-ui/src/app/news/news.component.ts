import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';
import { News } from '../news';
import { NewsService } from '../news.service';
import { HelperService } from '../helper.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NewsComponent implements OnInit {

  news: Array<News> = [];
  searchInput: FormControl = new FormControl('');
  cols: Observable<number>;
  descriptionClass: Observable<string>;

  constructor(public helper: HelperService,
    private _newsSvc: NewsService,
    private _dialog: MatDialog,
    private _observableMedia: ObservableMedia) { }

  ngOnInit() {
    const colMap = new Map([
      ['xs', 1],
      ['sm', 1],
      ['md', 2],
      ['lg', 2],
      ['xl', 2]
    ]);
    const classMap = new Map([
      ['xs', 'description-xs'],
      ['sm', 'description'],
      ['md', 'description'],
      ['lg', 'description'],
      ['xl', 'description']
    ]);

    let startCol: number;
    colMap.forEach((cols, mqAlias) => {
      if (this._observableMedia.isActive(mqAlias)) {
        startCol = cols;
      }
    });
    this.cols = this._observableMedia.asObservable().pipe(
      map(change => colMap.get(change.mqAlias)),
      startWith(startCol)
    );

    let startClass: string;
    classMap.forEach((classes, mqAlias) => {
      if (this._observableMedia.isActive(mqAlias)) {
        startClass = classes;
      }
    });
    this.descriptionClass = this._observableMedia.asObservable().pipe(
      map(change => classMap.get(change.mqAlias)),
      startWith(startClass)
    );

    this._newsSvc.getNews().subscribe(data => this.news = this.news.concat(data));
    this.searchInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(keywords => this._newsSvc.searchNews(keywords))
    ).subscribe(data => {
      this.news = [];
      this.news = data;
    });
  }

  onUpdate() {
    const dialogRef = this._dialog.open(LoadingDialogComponent, { disableClose: true });
    this._newsSvc.updateNews().subscribe(sources => {
      for (const source of sources) {
        for (const n of source) {
          this.news.splice(0, 0, n);
        }
      }
      dialogRef.close();
    }, error => dialogRef.close());
  }

  onSearch() {
    const keywords = this.searchInput.value.trim();
    if (keywords === '') {
      this._newsSvc.getNews().subscribe(data => this.news = data);
    } else {
      this._newsSvc.searchNews(this.searchInput.value).subscribe(data => {
        this.news = [];
        this.news = data;
      });
    }
  }
}
