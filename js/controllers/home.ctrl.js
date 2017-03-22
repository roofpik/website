app.controller('homeCtrl', function($scope) {
    // anychart.onDocumentReady(function() {
    //     // create pie chart with passed data
    //     chart = anychart.pie([
    //         ['Department Stores', 6371664],
    //         ['Discount Stores', 7216301],
    //         ['Men\'s/Women\'s Stores', 1486621],
    //         ['Juvenile Specialty Stores', 786622],
    //         ['All other outlets', 900000]
    //     ]);

    //     // set container id for the chart
    //     chart.container('chart1');

    //     // set chart title text settings
    //     chart.legend(false);

    //     //set chart radius
    //     chart.radius('50%');

    //     // create empty area in pie chart
    //     chart.innerRadius('40%');

    //     // initiate chart drawing
    //     chart.draw();
    // });
    $('.modal').modal();
    $('ul.tabs').tabs();
    Materialize.updateTextFields();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('select').material_select();
    $('.slider').slider();
    $('.dropdown-button').dropdown();
    $('.carousel').carousel();
});

app.controller('searchCtrl', function($scope) {
    $('.modal').modal();
    $('ul.tabs').tabs();
    Materialize.updateTextFields();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('select').material_select();
    $('.slider').slider();
    $('.dropdown-button').dropdown();
    $('.carousel').carousel();
});

app.controller('popularSearchCtrl', function($scope) {
    // console.log('popular working');
});

app.controller('microMarketsCtrl', function($scope) {
    // console.log('micro working');
    Highcharts.chart('chart1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: ' <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                size: '100%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Villas',
                y: 22,
                sliced: true,
                selected: true
            }, {
                name: 'Apartments',
                y: 70
            }, {
                name: 'Penthouse',
                y: 18
            }, {
                name: 'Row House',
                y: 15
            }]
        }]
    });


    Highcharts.chart('chart2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: ' <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                size: '100%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Villas',
                y: 18,
                sliced: true,
                selected: true
            }, {
                name: 'Apartments',
                y: 22
            }, {
                name: 'Penthouse',
                y: 19
            }, {
                name: 'Row House',
                y: 10
            }]
        }]
    });

    setTimeout(function() {
        $('#chart1').css('position', 'absolute');
        $('#chart1').css('top', '-18px');
        $('#chart2').css('position', 'absolute');
        $('#chart2').css('top', '-18px');
    }, 1000);
});

app.controller('popularProjectsCtrl', function($scope){
	$('.slider').slider();
})
