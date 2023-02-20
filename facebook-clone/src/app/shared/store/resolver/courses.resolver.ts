import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { finalize, first, Observable, tap } from "rxjs";
import { loadAllCourses } from "../actions/course.action";
import { AppState } from "../reducers/reducermap";

@Injectable()
export class CoursesResolver implements Resolve<any>{
loading = false;

    constructor(
        private store: Store<AppState>
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        
        return this.store
            .pipe(
                tap(()=>{
                    if(!this.loading){
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                first(),
                finalize(()=> this.loading = false)
            );
    }
}