import type {Attachment, Collaborator} from "airtable";

export type AirtableField = string | number | boolean | Collaborator | readonly Collaborator[] | readonly string[] | readonly Attachment[] | undefined;
