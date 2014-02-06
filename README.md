joins
=====

Utility functions for joining two arrays, including support for non-unique keys.

- `innerJoin` : Returns all records in the left array that have a matching record in the right array
- `outerJoin` : Returns all records in both the left and right array, matching records if they exist
- `leftJoin` : Returns all records in the left array along with any matching records in the right array
- `rightJoin` : Returns all records in the right array along with any matching records in the left array
- `leftExcludingJoin` : Returns all records in the left array that do NOT match any records in the right array
- `rightExcludingJoin` : Returns all records in the right array that do NOT match any records in the left array
- `outerExcludingJoin` : Returns all records in the left and right array that do not match

## Usage

All join operations are called by passing the left-hand and right-hand arrays along with the name of the 'key'
property in each record. An optional merge callback function can be provided to create custom records from
each pair of joined records.

Example:

    var joins = require('joins');
    joins.innerJoin(left, right, leftKey, rightKey);

This will perform an inner join on the `left` and `right` array using the `leftKey` and `rightKey`
properties. The resulting array will contain the joined records with each record containing all of the
properties from both the left-hand and right-hand records. Note that for duplicate property names the
value from the right-hand record will be used.

Example:

    var joins = require('joins');
    joins.innerJoin(left, right, leftKey, rightKey, function(left, right) {
        return {
            name: left.firstName + ' ' + left.lastName,
            address: right.location
        };
    });

This will perform an inner join on the `left` and `right` array using the `leftKey` and `rightKey`
properties. The resulting array will contain the joined records with each record containing the
custom properties specified in the custom merge function.

## Examples

- [all joins default](https://github.com/JeffEnglish/joins/blob/master/examples/allJoinsDefault.js)
- [all joins custom](https://github.com/JeffEnglish/joins/blob/master/examples/allJoinsCustom.js)

## License

Apache License Version 2.0