import {Author} from './author-model';
export class Comment {
	_id?: string;
	text: string;
	author: Author;
}