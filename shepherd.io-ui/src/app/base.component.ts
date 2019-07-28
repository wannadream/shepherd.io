import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

export abstract class BaseComponent {
  public isOnMobile: Observable<boolean>;

  baseInit(_observableMedia: MediaObserver) {
    this.isOnMobile = _observableMedia.asObservable().pipe(
      map(
        change =>
          change.findIndex(c => c.mqAlias === 'xs') > -1 ||
          change.findIndex(c => c.mqAlias === 'sm') > -1
      ),
      startWith(
        _observableMedia.isActive('xs') || _observableMedia.isActive('sm')
      )
    );
  }
}
