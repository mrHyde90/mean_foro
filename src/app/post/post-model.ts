import {Author} from './author-model';
export class PostModel {
	_id?: string;
	title: string;
	texto: string;
	categories: string[];
	created_at?: Date;
	author?: Author;
}
