import Datastore from '../basic/data.js';

const data = new Datastore({
    filename: 'data/user.db',
    autoload: true
});

export default data;
