/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = function (array) {
    const [firstName, familyName, title, payPerHour] = array;
    const timeInEvents = [];
    const timeOutEvents = [];

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents,
    }
}


const createEmployeeRecords = function (array){
    return array.map(function (element) {
        return createEmployeeRecord(element);
    })
}



const createTimeInEvent = function (timeStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(-4)),
        date: timeStamp.slice(0, 10),
    });

    return this;
}


const createTimeOutEvent = function (timeStamp){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(-4)),
        date: timeStamp.slice(0, 10),
        });

    return this;
}


const hoursWorkedOnDate = function (timeStamp){
    const that = this
    let timeOut = that.timeOutEvents.filter(element => element.date === timeStamp);
    let timeIn = that.timeInEvents.filter(element => element.date === timeStamp);
    
    let intTimeOut = (timeOut[0].hour) / 100;
    let intTimeIn = (timeIn[0].hour) / 100;

    return intTimeOut - intTimeIn;
}


function wagesEarnedOnDate(dateStamp){
    let owedPay = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;

    return owedPay;
}


function findEmployeeByFirstName(srcArray, firstName){
    const x = srcArray.filter(element => element.firstName === firstName)
    return x[0];
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function calculatePayroll(employeeRecordsArray){
    let costs = employeeRecordsArray.map(element => {
      return allWagesFor.call(element);
    });

    return costs.reduce((accumulator, currentValue) => {
      return accumulator += currentValue
    }, 0);
}

  