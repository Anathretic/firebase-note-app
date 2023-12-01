interface Note {
	id: string;
	title: string;
	description: string;
	date: number;
}

export interface DataArray {
	data: Note[];
}

export interface DataObject {
	data: Note;
}
