import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map } from "rxjs/operators";

@Component({
    selector: 'filter-input',
    styles: [`
        :host{
            display:flex;
        }   
    `],
    template:`
        <div class="input-group">
            <input #filterInput type="text" class="form-control" placeholder="Filter contacts">
        </div>
    `
})
export class FilterInputComponent implements AfterViewInit, OnDestroy{
    @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('filterInput', { static: true }) input: ElementRef;

    /** Observable of search string */
    public search$: Observable<string>;

    /** Subscription of keyup event */
    private sub:Subscription;

    ngAfterViewInit(){
        this.search$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
            map((event) => event.target.value),
            debounceTime(500),
            filter(search => search?.length !== 1),
            distinctUntilChanged()
        );
        this.sub = this.search$.subscribe((value) => this.onFilter.emit(value));
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}