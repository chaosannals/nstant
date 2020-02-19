import Datastore from '../data.js';

const data = new Datastore({
    filename: 'data/record.db',
    autoload: true
});

export default data;