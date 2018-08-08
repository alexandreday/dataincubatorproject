d3.json("data/chargepoint_data_v1.json", function(error1, cp_data) {
    d3.json("data/housing_data_v6.json", function(error2, housing_data) {

        var price = housing_data['price'];
        var sqft = housing_data['sqft'];
        var ratio = compute_ratio(price, sqft);
        var size = size_vs_price(ratio);
        var info = info_label(housing_data)

        trace_house = {
            'lat':housing_data['lat'],
            'lon':housing_data['lon'],
            'size':size,
            'info':info
        }

        var size = size_vs_ncharger(cp_data['n_charger']);
        var info = info_station_label(cp_data)

        trace_cp = {
            'lat':cp_data['lat'],
            'lon':cp_data['lon'],
            'size':size,
            'info':info
        }

        plot_all(trace_house, trace_cp);

        return;
})});

function info_label(housing_data){
    var info = [];
    //console.log(housing_data['buy_or_rent'])
    //console.log(housing_data['price'])
    /* console.log(housing_data['price'])
    console.log(housing_data['price'].length)
    stop() */

    for(var i=0;i<housing_data['price'].length;i++){
        info_str = "Rental price: "+housing_data['price'][i]+
        "$<br>Sqft: "+housing_data['sqft'][i]+
        "<br>Address: "+housing_data['address'][i]+
        "<br>Sale or Rent: "+housing_data['buy_or_rent'][i]+
        "<br>Type: "+housing_data['type'][i];
        info.push(info_str);
    }
    return info;
}

function info_station_label(housing_data){
    var info = [];
    //console.log("here")
    //console.log(housing_data)

    for(var i=0;i<housing_data['station_name'].length;i++){
        //info.push(housing_data['station_name'][i])
        info_str = "Station name: "+housing_data['station_name'][i]+
        "<br>Address: "+housing_data['address'][i]+
        "<br># of charger: "+housing_data['n_charger'][i]; 
        info.push(info_str);
    }
    return info;
}

function size_vs_price(ratio_price_sqft){
    var max_size = 10
    var max = Math.log(Math.max.apply(Math,ratio_price_sqft));
    var min = Math.log(Math.min.apply(Math,ratio_price_sqft));

    var size_ls = [];
    var marker_size;
    var min_size=6;

    for(var i=0;i<ratio_price_sqft.length;i++){
        marker_size =(ratio_price_sqft[i]-min)/(max-min+0.000000001)*max_size;
        if(marker_size > min_size){
            size_ls.push((ratio_price_sqft[i]-min)/(max-min+0.000000001)*max_size);
        }
        else{
            size_ls.push(min_size);
        }

    }
    return size_ls
}

function compute_ratio(price, sqft){
    var ratio = [];
    for(var i=0;i<price.length;i++){
        ratio.push(parseFloat(price[i])*1.0/parseFloat(sqft[i]));
    }
    return ratio
}

function size_vs_ncharger(ratio_price_sqft){
    var max_size = 12
    var max = Math.log(Math.max.apply(Math,ratio_price_sqft));
    var min = Math.log(Math.min.apply(Math,ratio_price_sqft));

    var size_ls = [];
    var marker_size;
    var min_size=10;

    for(var i=0;i<ratio_price_sqft.length;i++){
        marker_size =(ratio_price_sqft[i]-min)/(max-min+0.000000001)*max_size;
        if(marker_size > min_size){
            size_ls.push((ratio_price_sqft[i]-min)/(max-min+0.000000001)*max_size);
        }
        else{
            size_ls.push(min_size);
        }

    }
    return size_ls
}
  
  function plot_all(trace1, trace2){
    var data1 = {
        type:'scattermapbox',
        lat:trace1['lat'],
        lon:trace1['lon'],
        mode:'markers',
        marker: {
            opacity:0.7,
        line:{
            color:"rgb(255,255,255)",
            width:12
        },
        size:trace1['size']
        },
        text:trace1['info'],
        name:'Rental prop.'
    };
  
    var data2 = {
        type:'scattermapbox',
        lat:trace2['lat'],
        lon:trace2['lon'],
        mode:'markers',
        marker: {
        color:'red',
        opacity:0.7,
        line:{
            color:"rgb(255,255,255)",
            width:12
        },
        size:trace2['size']
        },
        text:trace2['info'],
        name:'Charging station'
    }; 
    
    var layout = {
        title: 'Geospatial location of charging stations in the DC metro area in relation to the cost of renting properties',
        font: {size:16},
        autosize: true,
        hovermode:'closest',
        showlegend: true,
        mapbox: {
        bearing:0,
        center: {
            lat:38.905136,
            lon:-77.050893
        },
        pitch:0,
        zoom:12
        },
        margin: {
            r: 20,
            t: 0,
            b: 20,
            l: 20,
            pad: 10
        }
    }
    
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
    })
    var all_data = [data1, data2];
    
    Plotly.plot('plt1', all_data, layout)
  }