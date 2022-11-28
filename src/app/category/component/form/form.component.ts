import { Component,Inject} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../../models/category';
import { Message } from '../../../models/message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent} from '../../../common/dialog/dialog.component';
@Component({
  selector: 'category-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  id:number = 0;
  categories: any;
  notAddPage:boolean = false;
  /**
   * コンストラクタ
   * @param route 
   * @param categoryService 
   */
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    // Form初期化
    this.categoryForm = new FormGroup({
      name:    new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      color: new FormControl(0, Validators.required),
    });
  }
  /**
   * 初期化イベント
   */
  ngOnInit(): void {
    this.route.url.subscribe(url => {
      // URLから登録ページか編集ページか判断 ※決め打ち
      this.notAddPage = url[1].path !== "add"
      if(this.notAddPage){
        // 編集ページの場合
        this.route.params.subscribe(params => {
          
          // データを取得
          this.getCategory(Number(params['id']))
        });
      }
    });
  }
  /**
   * 登録ボタンクリックイベント
   */
  onAddButtonClick(){
    let category:Category = this.categoryForm.value
    this.addCategory(category)
  }
  /**
   * 更新ボタンクリックイベント
   */
  onUpdateButtonClick(){
    let category:Category = this.categoryForm.value
    this.editCategory(this.id, category)
    console.log(category)
  }
  /**
   * 削除ボタンクリック
   */
  onDeleteButtonClick(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data:false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.categoryService.deleteCategory(this.id).subscribe((data)=>{
          this.snackBar.open(data.message, "OK", {
            duration: 2000
          });
          this.router.navigate(['/category']);
        })
      }
    });
  }
  /**
   * Categoryデータ取得処理
   * @param id 
   * @returns Categoryデータ
   */
  getCategory(id:number) {
    return this.categoryService.getCategory(id).subscribe((data)=>{
      console.log(data)
      // idを保持
      this.id = id
      this.categoryForm = new FormGroup({
        name:    new FormControl(data.name, Validators.required),
        slug: new FormControl(data.slug, Validators.required),
        color: new FormControl(data.color, Validators.required),
      });
    })
  }
  /**
   * Categoryデータ登録処理
   * @param category Categoryデータ
   */
  addCategory(category:Category){
    this.categoryService.addCategory(category).subscribe((data)=>{
      console.log(data)
      console.log(data)
      this.snackBar.open(data.message, "OK", {
        duration: 2000
      });
      this.router.navigate(['/category']);
    })
  }
  /**
   * Categoryデータ更新処理
   * @param category 
   */
  editCategory(id:number, category:Category){
    this.categoryService.editCategory(id, category).subscribe((data:Message)=>{
      console.log(data)
      this.snackBar.open(data.message, "OK", {
        duration: 2000
      });
      this.router.navigate(['/category']);
    })
  }
}