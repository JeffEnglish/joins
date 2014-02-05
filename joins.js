/*
	Utility functions for joining two arrays, including support for non-unique keys.

		innerJoin - Returns all records in the left array that have a matching record in the right array
		outerJoin - Returns all records in both the left and right array, matching records if they exist
		leftJoin - Returns all records in the left array along with any matching records in the right array
		rightJoin - Returns all records in the right array along with any matching records in the left array
		leftExcludingJoin - Returns all records in the left array that do NOT match any records in the right array
		rightExcludingJoin - Returns all records in the right array that do NOT match any records in the left array
		outerExcludingJoin - Returns all records in the left and right array that do not match

	References:
		http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins
		http://stackoverflow.com/questions/17500312/is-there-some-way-i-can-join-the-contents-of-two-javascript-arrays-much-like-i
 */

/**
 * Iterate the left-hand array and join matching right-hand entries
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} select - callback function (left, right) for inclusion logic. Callback returns true if record is to be joined.
 * @return {Array} array of joined records
 */
function leftIterate(left, right, leftKey, rightKey, select) {
	var index = [], result = [],
		len, i, row, record, key, entries;

	// Create index of right-hand records taking into account that there could be duplicate keys.
	// Each entry in the index is an array of right-hand records matching the index key value
	for (i = 0, len = right.length; i < len; i++) {
		row = right[i];
		key = row[rightKey];
		index[key] = index[key] || [];
		index[key].push(row);
	}

	// Iterate the left-hand records and callback for each matching pair
	for (i = 0, len = left.length; i < len; i++) {
		row = left[i];
		entries = index[row[leftKey]] || [ null ];
		entries.forEach(function(entry) {
			record = select(row, entry);
			if (record) {
				result.push(record);
			}
		});
	}

	return result;
}

/**
 * Iterate the left-hand array (inclusive) and the right-hand array (exclusive) and join records
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} select - callback function (left, right) for inclusion logic. Callback returns true if record is to be joined.
 * @return {Array} array of joined records
 */
function leftRightIterate(left, right, leftKey, rightKey, select) {
	// Iterate the left-hand array
	var leftResult = leftIterate(left, right, leftKey, rightKey, function(left, right) {
		return select(left, right);
	});

	// Iterate the right-hand array but only join if there is no match on the left
	var rightResult = leftIterate(right, left, rightKey, leftKey, function(right, left) {
		if (right && !left) {
			return select(left, right);
		}
	});

	// Append the right to the left and return
	leftResult.push.apply(leftResult, rightResult);
	return leftResult;
}

/**
 * Returns all records in the left array that have a matching record in the right array
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.innerJoin = function(left, right, leftKey, rightKey, merge) {
	return leftIterate(left, right, leftKey, rightKey, function(left, right) {
		if (left && right && (left[leftKey] == right[rightKey])) {
			return merge(left, right);
		}
	});
};

/**
 * Returns all records in both the left and right array, matching records if they exist
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.outerJoin = function(left, right, leftKey, rightKey, merge) {
	return leftRightIterate(left, right, leftKey, rightKey, function(left, right) {
		return merge(left || {}, right || {});
	});
};

/**
 * Returns all records in the left array along with any matching records in the right array
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.leftJoin = exports.leftOuterJoin = function(left, right, leftKey, rightKey, merge) {
	return leftIterate(left, right, leftKey, rightKey, function(left, right) {
		return merge(left, right || {});
	});
};

/**
 * Returns all records in the right array along with any matching records in the left array
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.rightJoin = exports.rightOuterJoin = function(left, right, leftKey, rightKey, merge) {
	return leftIterate(right, left, rightKey, leftKey, function(right, left) {
		return merge(left || {}, right);
	});
};

/**
 * Returns all records in the left array that do NOT match any records in the right array
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.leftExcludingJoin = function(left, right, leftKey, rightKey, merge) {
	return leftIterate(left, right, leftKey, rightKey, function(left, right) {
		if (left && !right) {
			return merge(left, {});
		}
	});
};

/**
 * Returns all records in the right array that do NOT match any records in the left array
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.rightExcludingJoin = function(left, right, leftKey, rightKey, merge) {
	return leftIterate(right, left, rightKey, leftKey, function(right, left) {
		if (right && !left) {
			return merge({}, right);
		}
	});
};

/**
 * Returns all records in the left and right array that do not match
 * @param {Array} left - array of left-hand records
 * @param {Array} right - array of right-hand records
 * @param {String} leftKey - property name of key for left-hand records
 * @param {String} rightKey - property name of key for right-hand records
 * @param {Function} merge - callback function (left, right) for joining records. Callback returns joined record.
 * @return {Array} array of joined records
 */
exports.outerExcludingJoin = function(left, right, leftKey, rightKey, merge) {
	return leftRightIterate(left, right, leftKey, rightKey, function(left, right) {
		if (!left || !right) {
			return merge(left || {}, right || {});
		}
	});
};