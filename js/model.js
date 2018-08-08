d3.json("data/train_model.json", function(error1, data) {

    console.log(data)
    train = data['train']
    model = data['model']
    plot1(train, model)
    //plot1(housing_data['lat'], housing_data['lon'], size, info);
    return;
});


function plot1(train, model){
    var trace1 = {
        x: train['x'],
        y: train['y'],
        mode: 'markers',
        type: 'scatter',
        name: 'Training data',
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 12 }
      };

    var trace2 = {
        x: model['x'],
        y: model['y'],
        mode: 'lines',
        name: 'Poly ridge reg.',
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 12 },
        line: {width:5}
      };

      var layout = {
        title: 'Polynomial Ridge regression for charging station proximity vs. cost of living',
        font: {size:14},
        autosize: true,
        hovermode:'closest',
        showlegend: true,
        /* margin: {
            r: ,
            t: 40,
            b: 20,
            l: 20,
            pad: 0
        } */
        xaxis: {
            title: 'Cost of living ($ / square feet)'
          },
        yaxis: {
            title: 'Median distance to nearest station (km)'
        }

    }

    var data = [ trace1, trace2];
    Plotly.newPlot('plt2', data, layout, {displayModeBar: false});

    }