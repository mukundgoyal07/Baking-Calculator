function compute()
{
    // retrieve principal from user
    var principal = Number(document.getElementById("principal").value);
    if (principal <= 0)  // check for valid principal
    {
        alert("Enter a positive number")
        document.getElementById("principal").focus();  // refocus the user
    }
    else
    {
        // retrieve remaining values from user
        var rate = Number(document.getElementById("rate").value);
        var years = Number(document.getElementById("years").value);

        // calculate remaining vars
        var interest = principal * years * rate / 100;
        var year = new Date().getFullYear()+parseInt(years);
        var amount = principal + interest;
        
        // Round monetrary values to nearest hundreth
        interest = money_round(interest);
        amount = money_round(amount);

        // Add commas for improved user readability
        interest = numberWithCommas(interest);
        principal = numberWithCommas(principal);
        amount = numberWithCommas(amount);
    
        // document.getElementById("result").innerHTML="If you deposit $\<mark\>"+principal+"\</mark\>,\<br\>at an interest rate of \<mark\>"+rate+"%\</mark\>\<br\>You will receive an interest amount of \<br\>$\<mark\>"+interest+"\</mark\>, in the year \<mark\>"+year+"\</mark\> \<br\> for a total of $\<mark\>"+amount+"\</mark\>.\<br\>";
        document.getElementById("principal_txt").innerHTML = principal;
        document.getElementById("interest").innerHTML = interest;
        document.getElementById("amount").innerHTML = amount;
        document.getElementById("year").innerHTML = year;
        document.getElementById("years_txt").innerHTML = years;
        document.getElementById("rate_txt").innerHTML = rate;

        window.update()
    }
    
}

function graph()
{
    // gather data from helper function
    data = getGraphData();
    principal = data[0];
    amount = data[1];
    interest = data[2];

    // build graph
    Highcharts.chart('container', {

        title: {
            text: 'Your Interest Growth over time'
        },

        yAxis: {
            title: {
                text: 'US Dollar ($)'
            }
        },
    
        xAxis: {
            accessibility: {
                rangeDescription: 'Years'
            },
            allowDecimals: false
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: new Date().getFullYear()
            }
        },
    
        series: [{
            name: 'Principal',
            data: principal
        }, {
            name: 'Amount',
            data: amount
        }, {
            name: 'Interest',
            data: interest
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}

// gather and organize the data needed for the graph
function getGraphData()
{
    principal = Number(document.getElementById("principal").value);
    rate = Number(document.getElementById("rate").value);
    years = Number(document.getElementById("years").value);

    // initial values must be stored before loop
    principal_arr = [principal];
    amount_arr = [principal];  // first year amount = principal
    interest_arr = [0]; // no interest in first year

    for (let i = 1; i <= years; i++)
    {
        interest = principal * rate * i / 100;
        amount = principal + interest;
        
        principal_arr.push(principal);
        amount_arr.push(amount);
        interest_arr.push(interest);
    }
    
    return [principal_arr, amount_arr, interest_arr];
}

// live update as rate slider moves
function updateRate() 
{
    var rateval = document.getElementById("rate").value;
    document.getElementById("rate_val").innerText=rateval;
    window.update();
}

// round to nearest hundreth
function money_round(num) {
    return Math.ceil(num * 100) / 100;
}

// automatically add commas to monetary values
function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
        