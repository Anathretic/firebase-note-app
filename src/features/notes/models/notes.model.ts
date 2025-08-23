type Status = 'addNote' | 'editNote' | '';

export interface NotesArrayModel {
	greeting: string;
}

export interface AddOrEditNoteModel {
	value: Status;
}
