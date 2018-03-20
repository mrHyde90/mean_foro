import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {PostModel} from '../post-model';
import {PostStorageService} from '../post-storage.service';

//continuar con el approach del formArray

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postal: PostModel;
	postForm: FormGroup;
  id: string;
  editable = false;
  posiblesCategorias:string[] = ["Tecnologia", "Salud", "Ninguna", "Cultura", "Miedo", "Amor", "Politica", "Geek", "Musica", "Deportes"];
	tengoCategorias: string[] = [];

  constructor(private postStorageService: PostStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editable = params["id"] != null;
      this.initCreateForm();
      if(this.editable){
        this.initEditableForm();
      }
    }); 
  }

  initEditableForm(){
    this.postStorageService.showPost(this.id)
      .subscribe((post:PostModel) => {
        let categories = [];
        for(let category of post.categories){
          this.tengoCategorias.push(category);
          const control = new FormControl(category, Validators.required);
          categories.push(control);
        }
        console.log("Iphone love");
        console.log(post.title);
        this.postForm = new FormGroup({
          'title': new FormControl(post.title, Validators.required),
          'texto': new FormControl(post.texto, Validators.required),
          "categories": new FormArray(categories)
        });
      });
  }

  initCreateForm(){
    this.postForm = new FormGroup({
      'title': new FormControl("", Validators.required),
      'texto': new FormControl("", Validators.required),
      "categories": new FormArray([])
    });
  }

  onAddCategory(nameInput: string){
    if(this.tengoCategorias.length < 5 && !this.tengoCategorias.includes(nameInput)){
      this.tengoCategorias.push(nameInput);
      const control = new FormControl(nameInput, Validators.required);
      (<FormArray>this.postForm.get('categories')).push(control);
    }
    console.log(nameInput);
  }

  onDeleteCategory(index: number){
    //delete
    console.log(index);
    this.tengoCategorias.splice(index, 1);
    (<FormArray>this.postForm.get('categories')).removeAt(index);
  }

  onSubmit() {
    console.log(this.postForm);
    const post = {
      title: this.postForm.value.title,
      texto: this.postForm.value.texto,
      categories: this.postForm.value.categories
    };

    if(this.editable) {
      this.postStorageService.updatePost(this.id, post)
        .subscribe(
          (message: string) => {
            console.log(message);
            this.postForm.reset();
            this.router.navigate(["/post"]); 
          }, 
          error => console.log(error)
        ); 
    } else{
      this.postStorageService.createPost(post)
        .subscribe(
          (newPost: PostModel) => {
            this.postForm.reset();
            this.router.navigate(["/post"]);
          },
          error => console.log(error)
        );
    } 
  }

}
