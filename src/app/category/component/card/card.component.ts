import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Category } from '../../../models/category';
import { Status } from '../../../models/status';
import { Utils } from '../../../common/util/util';
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
  categoryColorClassList:any ={
    1:"category-color-RED",
    2:"category-color-YELLO",
    3:"category-color-BLUE"
  }
  constructor(private sanitizer: DomSanitizer,protected util: Utils) {}
  getBrEscape(text:string){
    return text.replace(/\\r\\n/g, '\r\n');
  }
  getCategoryColor(code:number){
    return this.categoryColorClassList[code]
  }
}
