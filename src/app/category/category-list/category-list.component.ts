import { Component, OnInit , Input} from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  categoryList:any = []
  constructor(
    private snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getCategoryList()
  }
  getCategoryList() {
    return this.categoryService.listCategory()
    .subscribe(
      (data)=>{
        this.categoryList = data
      },
      (error)=>{
        this.snackBar.open("サーバーとの通信に失敗しました", "OK");
      }
    )
  }
}
