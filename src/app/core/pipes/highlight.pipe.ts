import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'highlighter'
})
export class HighlightPipe implements PipeTransform{

    transform(value: any, args: string){
        if(!args) return value;

        /** Regex match values */
        const regex = new RegExp(args, 'gi');
        const match = value.match(regex);

        /** Return if no match */
        if(!match) return value;

        return value.replace(regex, `<mark class="bg-info text-light">${match[0]}</mark>`);
        
    }
}