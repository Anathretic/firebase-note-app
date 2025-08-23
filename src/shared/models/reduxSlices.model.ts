export interface UserDataModel {
	data: NoteItemModel[];
}

export type NoteItemModel = {
	id: string;
	title: string;
	description: string;
	date: number;
};

export type EditNoteDataModel = {
	data: NoteItemModel;
};
