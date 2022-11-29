import { Component,Input} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TodoService } from '../../../service/todo.service';
import { Todo } from '../../../models/todo';
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
  @Input() path: string = ''
  todoForm: FormGroup;
  id:number = 0;
  categories: any;
  notAddPage:boolean = false;
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
    private todoService: TodoService
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
    // コンポーネント呼び出し元から、登録Formか更新Formか判断する
    this.notAddPage = this.path !== "add"
    if(this.notAddPage){
      // 編集ページの場合
      this.route.params.subscribe(params => {
        
        // データを取得
        this.getTodo(Number(params['id']))
      });
    }
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