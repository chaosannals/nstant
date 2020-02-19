import Datastore from '../data.js';

const data = new Datastore({
    filename: 'data/user.db',
    autoload: true
});

export default data;
