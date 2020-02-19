import Datastore from '../data.js';

const data = new Datastore({
    inMemoryOnly: true,
    autoload: true
});

export default data;