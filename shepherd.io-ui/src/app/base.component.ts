import { Observable } from 'rxjs';
import { ObservableMedia } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

export abstract class BaseComponent {

    public isOnMobile: Observable<boolean>;

    baseInit(_observableMedia: ObservableMedia) {
        this.isOnMobile = _observableMedia.asObservable().pipe(
            map(change => change.mqAlias === 'xs' || change.mqAlias === 'sm'),
            startWith(_observableMedia.isActive('xs') || _observableMedia.isActive('sm'))
        );
    }
}
