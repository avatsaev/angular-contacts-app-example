import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
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
    @Input() filterText: string = '';
    @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('filterInput', { static: true }) input: ElementRef;

    /** Observable of search string */
    public search$: Observable<string>;

    /** Subscription of keyup event */
    private sub:Subscription;

    ngAfterViewInit(){
        /** Init input with initial filter text */
        this.input.nativeElement.value = this.filterText;

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