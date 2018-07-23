d3.json("plot2_data.json", function(error1, data) {
    scatterplot(data['x'], data['y'], xlabel="Cost of property (\$/square-feet)",ylabel="Number of stations within a distance of 1 mile")
});
function scatterplot(x, y, xlabel, ylabel){
    var trace1 = {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12 }
      };
      layout= {
        hovermode:'closest',
        xaxis:{title:xlabel},
        yaxis:{title:ylabel},
        showlegend: false
    }
        
    Plotly.newPlot('plt2', [trace1], layout);
};

