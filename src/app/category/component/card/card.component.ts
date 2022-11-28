import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Category } from '../../../models/category';
import { Status } from '../../../models/status';
@Component({
  selector: 'category-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CategoryCardComponent {
  @Input() item:Category = {
    id: 0,
    name: '',
    slug: '',
    color: 0,
    createdAt:'',
    updatedAt:''
  }
  constructor(private sanitizer: DomSanitizer) {}
  getBrEscape(text:string){
    return text.replace(/\\r\\n/g, '\r\n');
  }
  getLocalTime(timeStr?:string){
    if(typeof timeStr === 'string'){
      return new Date(timeStr).toLocaleDateString() +' '+ new Date(timeStr).toLocaleTimeString()
    }else{
      return ''
    }
  }
  getCategoryColor(code:number){
    return ''
  }
}
