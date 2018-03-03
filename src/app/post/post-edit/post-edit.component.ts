import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import {PostStorageService} from '../post-storage.service';

//continuar con el approach del formArray

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
	postForm: FormGroup;
  id: string;
  editable = false;
  posiblesCategorias:string[] = ["Tecnologia", "Salud", "Ninguna", "Cultura", "Miedo", "Amor", "Politica", "Geek", "Musica", "Deportes"];
	tengoCategorias: string[] = [];

  constructor(private postStorageService: PostStorageService,
              private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editable = params["id"] != null;
      this.initform();
    }); 
  }

   initform() {
    let postTitle = "";
    let postTexto = "";
    let categories = [];
    if(this.editable){
      const post = this.postService.getPost(this.id);
      postTitle = post.title;
      postTexto = post.texto;
      //recuerda el in en arreglos te devuelve el index (0, 1, 2)
      //el in en objetos te devuelve la key ("Arroz")
      for(let category of post.categories){
        this.tengoCategorias.push(category);
        const control = new FormControl(category, Validators.required);
        categories.push(control);
      }
    }
    this.postForm = new FormGroup({
      'title': new FormControl(postTitle, Validators.required),
      'texto': new FormControl(postTexto, Validators.required),
      "categories": new FormArray(categories)
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
      this.postStorageService.updatePost(this.id, post).subscribe((message: string) => {
        console.log(message);
        this.postService.updatePost(post, this.id);
        this.postForm.reset();
        this.router.navigate(["/post"]); 
      }); 
    } else{
      this.postStorageService.createPost(post)
        .subscribe((newPost: PostModel) => {
          this.postService.addPost(newPost);
          this.postForm.reset();
        this.router.navigate(["/post"]);
      });
    } 
  }

}
