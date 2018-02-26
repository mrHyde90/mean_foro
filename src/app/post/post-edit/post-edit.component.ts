import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import {PostStorageService} from '../post-storage.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
	postForm: FormGroup;
  id: string;
  editable = false;
	

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
    if(this.editable){
      const post = this.postService.getPost(this.id);
      postTitle = post.title;
      postTexto = post.texto;
    }
    this.postForm = new FormGroup({
      'title': new FormControl(postTitle, Validators.required),
      'texto': new FormControl(postTexto, Validators.required)
    });
  }

  onSubmit() {
    const post = {
      title: this.postForm.value.title,
      texto: this.postForm.value.texto
    };

    if(this.editable) {
      this.postStorageService.updatePost(this.id, post).subscribe((message: string) => {
        console.log(message);
        this.postService.updatePost(post, this.id);
        this.router.navigate(["/post"]); 
      }); 
    } else{
      this.postStorageService.createPost(post)
        .subscribe((newPost: PostModel) => {
          this.postService.addPost(newPost);
        this.router.navigate(["/post"]);
      });
    }
  }

}
