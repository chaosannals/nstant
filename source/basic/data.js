import Nedb from 'nedb';

/**
 * 
 */
export default class Datastore {
    /**
     * 
     * @param {*} setting 
     */
    constructor(setting) {
        this.data = new Nedb(setting);
    }

    /**
     * 
     * @param {*} data 
     */
    insert(data) {
        return new Promise((resolve, reject) => {
            this.data.insert(data, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        });
    }

    /**
     * 
     * @param {*} query 
     */
    count(query) {
        return new Promise((resolve, reject) => {
            this.data.count(query, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        });
    }

    /**
     * 
     * @param {*} query 
     * @param {*} command 
     * @param {*} options 
     */
    update(query, command, options) {
        return new Promise((resolve, reject) => {
            this.data.update(query, command, options, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        })
    }

    /**
     * 
     * @param {*} query 
     * @param {*} options 
     */
    remove(query, options) {
        return new Promise((resolve, reject) => {
            this.data.remove(query, options, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        });
    }

    /**
     * 
     * @param {*} query 
     */
    find(query) {
        return new Promise((resolve, reject) => {
            this.data.findOne(query, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            })
        });
    }

    /**
     * 
     */
    fetch(query) {
        return new Promise((resolve, reject) => {
            this.data.find(query, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        });
    }

    /**
     * 
     * @param {*} options 
     */
    ensureIndex(options) {
        return new Promise((resolve, reject) => {
            this.ensureIndex(options, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        });
    }

    /**
     * 
     * @param {*} field 
     */
    removeIndex(field) {
        return new Promise((resolve, reject) => {
            this.removeIndex(field, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            });
        });
    }
}