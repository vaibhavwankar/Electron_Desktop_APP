export interface EditForm {
    firstName: string;
    mobileNumber: string;
    emailAddress: string;
    adhaarId: string;
};
export interface PouchDBRemoveResult {
    ok: boolean;
    id: string;
    rev: string;
}
export interface PouchDBGetResult {
    _id: string;
    _rev: string;
}

export interface PouchDBPutResult {
    ok: boolean;
    id: string;
    rev: string;
}
export interface IPouchDBGetResult extends PouchDBGetResult {
    lastname: string;
    dob: string;
    number: string
}
export interface Patient {
    firstName: string;
    Dob: string;
    Number: string;
    email: string
}
export interface PouchDBRow {
    id: string;
    key: string;
    value: { rev: string };

    // Only included if include_docs is set to true during query.
    doc?: any;
}
export interface IPouchDBAllDocsResult {
    offset: number;
    total_rows: number;
    rows: PouchDBRow[];
}


export interface result{
    _id:string;
    firstName: string;
    mobileNumber: string;
    emailAddress: string;
    adhaarId: string;
    deleted:number
}

