/*
    Example of joining two arrays using the default merge function. The default
    merge function will return a record containing all of the properties of the
    two joined records.

    This example performs all of the available join operations.
 */
var joins = require('../joins');

(function testJoins() {
    var people = [
        { name: 'Joe Smith', accountId: 1 },
        { name: 'Julie Jones', accountId: 2 },
        { name: 'Mark Davis', accountId: 3 }
    ];

    var property = [
        { pid: 1, loc: '123 Main Street' },
        { pid: 3, loc: '45 West Third' },
        { pid: 5, loc: '917 Gothard Road' },
        { pid: 3, loc: '1700 Avenue K Apt 3' },
        { pid: 4, loc: '277 Highway 210' }
    ];

    var result;

    var allJoins = [
        'innerJoin',
        'outerJoin',
        'leftJoin',
        'rightJoin',
        'leftExcludingJoin',
        'rightExcludingJoin',
        'outerExcludingJoin'
    ];

    allJoins.forEach(function(j) {
        console.log(j);
        result = joins[j](people, property, 'accountId', 'pid');
        console.log(JSON.stringify(result, null, '\t'));
    });
})();

