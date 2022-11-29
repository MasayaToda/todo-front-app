import { Component,Inject} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TodoService } from '../../../service/todo.service';
import { StatusService } from '../../../service/status.service';
import { CategoryService } from '../../../service/category.service';
import { Todo } from '../../../models/todo';
import { Status } from '../../../models/status';
import { Category } from '../../../models/category';
import { Message } from '../../../models/message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent} from '../../../common/dialog/dialog.component';
@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TodoFormComponent {
  todoForm: FormGroup;
  id:number = 0;
  categories: any;
  notAddPage:boolean = false;
  statusList:Status[] = []
  categoryList:Category[] = []
  /**
   * コンストラクタ
   * @param route 
   * @param todoService 
   */
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private statusService: StatusService,
    private categoryService: CategoryService,
  ) {
    // Form初期化
    this.todoForm = new FormGroup({
      title:    new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
  }
  /**
   * 初期化イベント
   */
  ngOnInit(): void {
    this.getStatusList()
    this.getCategoryList()
    this.route.url.subscribe(url => {
      // URLから登録ページか編集ページか判断 ※決め打ち
      this.notAddPage = url[1].path !== "add"
      if(this.notAddPage){
        // 編集ページの場合
        this.route.params.subscribe(params => {
          
          // データを取得
          this.getTodo(Number(params['id']))
        });
      }
    });
  }
  /**
   * 登録ボタンクリックイベント
   */
  onAddButtonClick(){
    let todo:Todo = this.todoForm.value
    this.addTodo(todo)
  }
  /**
   * 更新ボタンクリックイベント
   */
  onUpdateButtonClick(){
    let todo:Todo = this.todoForm.value
    this.editTodo(this.id, todo)
    console.log(todo)
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
        this.todoService.deleteTodo(this.id).subscribe((data)=>{
          this.snackBar.open(data.message, "OK", {
            duration: 2000
          });
          this.router.navigate(['/todo']);
        })
      }
    });
  }
  /**
   * Todoデータ取得処理
   * @param id 
   * @returns Todoデータ
   */
  getTodo(id:number) {
    return this.todoService.getTodo(id).subscribe((data)=>{
      console.log(data)
      // idを保持
      this.id = id
      // bodyの改行を修正
      data.body = data.body.replace(/(\\r\\n|\\n|\\r)/g,"\n")
      this.todoForm = new FormGroup({
        title:    new FormControl(data.title, Validators.required),
        categoryId: new FormControl(data.categoryId, Validators.required),
        body: new FormControl(data.body, Validators.required),
        state: new FormControl(data.state, Validators.required),
      });
    })
  }
  /**
   * ステータスリストを取得
   * @returns ステータスリスト取得処理
   */
  getStatusList() {
    return this.statusService.listStatus().subscribe((data)=>{
      this.statusList = data
    })
  }
  /**
   * カテゴリリストを取得
   * @returns 
   */
  getCategoryList() {
    return this.categoryService.listCategory().subscribe((data)=>{
      this.categoryList = data
    })
  }
  /**
   * Todoデータ登録処理
   * @param todo Todoデータ
   */
  addTodo(todo:Todo){
    this.todoService.addTodo(todo).subscribe((data)=>{
      console.log(data)
      console.log(data)
      this.snackBar.open(data.message, "OK", {
        duration: 2000
      });
      this.router.navigate(['/todo']);
    })
  }
  /**
   * Todoデータ更新処理
   * @param todo 
   */
  editTodo(id:number, todo:Todo){
    this.todoService.editTodo(id, todo).subscribe((data:Message)=>{
      console.log(data)
      this.snackBar.open(data.message, "OK", {
        duration: 2000
      });
      this.router.navigate(['/todo']);
    })
  }
}