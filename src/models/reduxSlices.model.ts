type Status = 'addNote' | 'editNote' | '';

interface NoteItemModel {
	id: string;
	title: string;
	description: string;
	date: number;
}

export interface UserDataModel {
	data: NoteItemModel[];
}

export interface AuthModel {
	isLoggedIn: boolean;
	showRegisterPanel: boolean;
}

export interface AddOrEditNoteModel {
	value: Status;
}

export interface EditNoteDataModel {
	data: NoteItemModel;
}

export interface ErrorPopupModel {
	value: string;
}
