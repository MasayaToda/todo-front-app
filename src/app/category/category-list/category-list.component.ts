import { Component, OnInit , Input} from '@angular/core';
import { CategoryService } from '../../service/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  categoryList:any = []
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategoryList()
  }
  getCategoryList() {
    return this.categoryService.listCategory().subscribe((data)=>{
      this.categoryList = data
    })
  }
}
