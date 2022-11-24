import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Event, NavigationEnd, ActivatedRoute, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TodoService } from '../../service/todo.service';
@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  todoForm: FormGroup;
  categories: any;
  isAddPage:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {
    // Form初期化
    this.todoForm = new FormGroup({
      title:    new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.route.url.subscribe(url => {
      // URLから登録ページか編集ページか判断 ※決め打ち
      this.isAddPage = url[1].path !== "add"
      if(this.isAddPage){
        // 編集ページの場合
        this.route.params.subscribe(params => {
          // データを取得
          this.getTodo(Number(params['id']))
        });
      }
    });
  }

  getTodo(id:number) {
    return this.todoService.getTodo(id).subscribe((data)=>{
      console.log(data)
      this.todoForm = new FormGroup({
        title:    new FormControl(data.title, Validators.required),
        category: new FormControl(data.categoryId, Validators.required),
        body: new FormControl(data.body, Validators.required),
        state: new FormControl(data.state, Validators.required),
      });
    })
  }
  onAddButtonClick(){

  }
  onUpdateButtonClick(){
    
  }
}
