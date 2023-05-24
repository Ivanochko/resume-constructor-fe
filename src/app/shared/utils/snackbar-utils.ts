import {Observable, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../snackbar/snackbar.component";

export class SnackbarUtils {
  constructor() {
  }

  public static handleObservable(observable: Observable<any>, entity: string, _snackBar: MatSnackBar): Observable<void> {
    let  observableCompleted = new Subject<void>();
    observable.subscribe(
      (_) => {
        SnackbarUtils.onResponse(`${entity} saved successfully!`, _snackBar)
      },
      (error) => {
        SnackbarUtils.onResponse(error.error, _snackBar)
      },
      () => {
        observableCompleted.next()
      }
    )
    return observableCompleted;
  }

  private static onResponse(response: string, _snackBar: MatSnackBar) {
    _snackBar.openFromComponent(SnackbarComponent,
      {data: {'message': response}}
    );
  }

}
