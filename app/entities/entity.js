/**
 * Base Entity class that will define behaviour for entities stored in redis.
 *
 * This is a work in progress. Wanting to define a easy way to create and store
 * data in a SQL-like way in a redis database.
 *
 * @class Entity
 */
class Entity {
    constructor(fields) {
        // Check that columns have been defined.
        if (
            !this.columns ||
            !Array.isArray(this.columns) ||
            this.columns.length === 0
        ) {
            throw new Error('There must be at least one column defined.');
        }

        // Check that fields passed match the columns defined.
        const keys = Object.keys(fields);
        let missing = missingInArray(this.columns, keys);
        let extra = missingInArray(keys, this.columns);

        if (missing.length > 0 || extra.length > 0) {
            let msg = 'Invalid fields input!\n';

            for (const m of missing) {
                msg += `\t"${m}" is a required field\n`;
            }

            msg += '\n';

            for (const e of extra) {
                msg += `\t"${e}" is not a valid field\n`;
            }

            throw new Error(msg);
        }

        // Hoist field values to object to be accessible as an attribute of the
        // object.
        for (const name of this.columns) {
            this[name] = fields[name];
        }
    }
}

function missingInArray(expected, actual) {
    return expected.filter(v => !actual.includes(v));
}

module.exports = Entity;
