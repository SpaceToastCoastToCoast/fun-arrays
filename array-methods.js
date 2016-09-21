var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function(element){
  return element.amount > 100000.00;
});

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances.map(function(element) {
  return {
    amount: element.amount,
    state: element.state,
    rounded: Math.round(element.amount)
  };
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances.map(function(element) {
  return {
    amount: parseFloat(parseFloat(element.amount).toFixed(1)),
    state: element.state
  };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
function bankSum(prev, curr, index, array) {
  return (Math.round(prev * 100) / 100) + (Math.round(curr * 100) / 100);
}

var sumOfBankBalances = dataset.bankBalances.map(function(element) {
  return parseFloat(element.amount);
}).reduce(bankSum, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var interestStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
function interestSum(prev, curr, index, array) {
  return ((Math.round(prev * 100) / 100)) + ((Math.round(curr * 100) / 100));
}
var statesWithInterestToSum = dataset.bankBalances.filter(function(element) {
  return interestStates.indexOf(element.state) > -1;
});
var sumOfInterests = statesWithInterestToSum.map(function(element) {
  return parseFloat(element.amount) * 0.189;
}).reduce(interestSum, 0);




// });
// var statesToSum = highInterestStates.map(function(element, index) {
//   var s = [];
//   if(s.indexOf(element.state) === -1) {
//     s.push(element.state);
//   }
//   return s[s.indexOf(element.state)];
// });
// var highInterestApplied = highInterestStates.map(function(element) {
//   return {
//     amount: parseFloat(element.amount) * 0.189,
//     state: element.state
//   };
// });
// var sums = statesToSum.map(function() {return 0;});
// var highInterestSummed = highInterestApplied.map(function(element) {
//   sums[statesToSum.indexOf(element.state)] += parseFloat(element.amount);
//   return sums[statesToSum.indexOf(element.state)];
// });
// var greaterThanFiftyThou = highInterestSummed.filter(function(element) {
//   return element > 50000;
// });
// //console.log(greaterThanFiftyThou);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var obj = {};
var stateSumMaker = function(element) {
  if(!obj.hasOwnProperty(element.state)) {
    obj[element.state] = parseFloat(element.amount);
  } else if (obj.hasOwnProperty(element.state)) {
    obj[element.state] += parseFloat(element.amount);
  }
  obj[element.state] = (Math.round(obj[element.state] * 100) / 100);
  return obj;
};
dataset.bankBalances.map(stateSumMaker);
var stateSums = obj;

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

var highInterestStates = dataset.bankBalances.filter(function(element) {
  return interestStates.indexOf(element.state) === -1;
});

var stateHighSumMaker = function(element) {
  if(!obj.hasOwnProperty(element.state)) {
    obj[element.state] = parseFloat(element.amount) * 0.189;
  } else if (obj.hasOwnProperty(element.state)) {
    obj[element.state] += parseFloat(element.amount) * 0.189;
  }
  obj[element.state] = obj[element.state];
  return obj;
};

obj = {};
var highInterestStateSums = highInterestStates.map(stateHighSumMaker);
var interestKeys = Object.keys(obj).map(function(element, index) {
  return obj[element];
});
var overFiftyThou = interestKeys.filter(function(element) {
  return element > 50000;
});

var sumOfHighInterests = overFiftyThou.reduce(bankSum, 0);
console.log(sumOfHighInterests);



/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
