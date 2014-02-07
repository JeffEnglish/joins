/*
    Example of joining two arrays using a custom merge function. The custom
    merge function will return a record containing selected fields from the
    two joined records.

    This example performs all of the available join operations.
 */
var joins = require('../joins');

(function testJoins() {
    var people = [
        { firstName: 'Joe', lastName: 'Smith', accountId: 1 },
        { firstName: 'Julie', lastName: 'Jones', accountId: 2 },
        { firstName: 'Mark', lastName: 'Davis', accountId: 3 }
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
        result = joins[j](people, property, 'accountId', 'pid', function(peop, prop) {
            return {
                accountId: peop.accountId || prop.pid,
                fullName: peop.firstName ? (peop.firstName + ' ' + peop.lastName) : undefined,
                address: prop.loc
            };
        });
        console.log(JSON.stringify(result, null, '\t'));
    });
})();

