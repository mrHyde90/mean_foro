import { Component, OnInit } from '@angular/core';
import {PostModel} from '../post-model';
import {PostStorageService} from '../post-storage.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: PostModel[]; 

  constructor(private postStorageService: PostStorageService) { }

  ngOnInit() {
  	this.posts =  [
    {
    title: "Valentines day",
    texto: "A black winter care away",
    author: "Chester Benningtion"
  }, 
  {
    title: "In the End",
    texto: "I tried so hard and got so far, but in the end, it doesnt even matter",
    author: "Mike Shinoda"
  },
  {
    title: "little things give you away",
    texto: "All you ever wanted, so wanna truly look up to you",
    author: "Chester Benningtion"
  },
  {
    title: "Adventure of the life time",
    texto: "monitos  monitos y mas monitos seee",
    author: "Coldplay"
  }
  ];
  }

  /*
    this.postStorageService.getPosts().subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });
  */

}
