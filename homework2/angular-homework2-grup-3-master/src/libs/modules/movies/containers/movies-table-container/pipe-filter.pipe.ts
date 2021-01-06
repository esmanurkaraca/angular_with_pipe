import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from '../../models/movie-models';

@Pipe({
  name: 'pipeFilter'
})
export class PipeFilterPipe implements PipeTransform {

  transform(value:  IMovie[], filterText: string):  IMovie[] {
    filterText=filterText ? filterText.toLocaleLowerCase():null

    return filterText?value.filter((m: IMovie)=>m.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
