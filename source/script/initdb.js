import user from '../model/user.js';
import sha256 from 'crypto-js/sha256.js';

user.insert([{
    username: 'nstant01',
    password: sha256('123456').toString(),
}, {
    username: 'nstant02',
    password: sha256('123456').toString(),
}], (e, r) => {
    console.log(e, r);
});
