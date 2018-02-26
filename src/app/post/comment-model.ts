import {Author} from './author-model';
export class Comment {
	_id?: string;
	created_at?: Date;
	text: string;
	author: Author;
}