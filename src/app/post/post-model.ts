import {Comment} from './comment-model';
import {Author} from './author-model';
export class PostModel {
	_id?: string;
	title: string;
	texto: string;
	author: Author;
	comments: Comment[];
}
