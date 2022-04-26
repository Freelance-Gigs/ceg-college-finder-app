import Airtable from 'airtable';


Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keymSkowiKSKZuRLX',
});

const COLLEGE_INTERESTS_BASE = Airtable.base('app9u5JhBdN0S4k25');
const COLLEGE_DETAILS_BASE = Airtable.base('appgsYket586GKl1a');

export const COLLEGE_INTERESTS_TABLE = COLLEGE_INTERESTS_BASE('Imported table');
export const COLLEGE_DETAILS_TABLE = COLLEGE_DETAILS_BASE('Imported table');
