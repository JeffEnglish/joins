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

Call one of the join functions passing the left-hand and right-hand arrays:

    var joins = require('joins');

    var result = joins.innerJoin(people, property, 'accountId', 'pid', function(peop, prop) {
        return {
            accountId: peop.accountId,
            propertId: prop.pid,
            accountRep: peop.name,
            address: prop.loc
        };
    });

## Examples

- [all joins](https://github.com/JeffEnglish/joins/examples/alljoins.js)

## License

Apache License Version 2.0