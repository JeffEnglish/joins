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
        result = joins[j](people, property, 'accountId', 'pid', function(peop, prop) {
            return {
                accountId: peop.accountId,
                propertId: prop.pid,
                accountRep: peop.name,
                address: prop.loc
            };
        });
        console.log(JSON.stringify(result, null, '\t'));
    });
})();

