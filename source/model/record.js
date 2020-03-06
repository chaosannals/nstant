import Datastore from '../basic/data.js';

const data = new Datastore({
    filename: 'data/record.db',
    autoload: true
});

export default data;