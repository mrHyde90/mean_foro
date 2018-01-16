import {Comment} from './comment-model';
export class PostModel {
	_id?: string;
	title: string;
	texto: string;
	author: string;
	comments: Comment[];
}
