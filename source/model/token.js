import Datastore from '../basic/data.js';

const data = new Datastore({
    filename: "data/token.db",
    autoload: true
});

export default data;