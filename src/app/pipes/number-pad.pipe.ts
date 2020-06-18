import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberPad',
})
export class NumberPadPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        const valueString: string = value.toString();
        let returnString;
        if (valueString.length === 1) {
            returnString = `00${valueString}`;
        } else if (valueString.length === 2) {
            returnString = `0${valueString}`;
        } else {
            returnString = valueString;
        }

        console.log(returnString);
        return returnString;
    }
}
