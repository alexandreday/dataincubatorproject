d3.json("housing_data.json", function(error1, data) {
    d3.json("chargingstation_data.json", function(error2, data2) {

    var n_data2=data2['address'].length;
    info2=[]
    size2=size_vs_price(data2['n_charger'])
    for(var i=0;i<n_data2;i++){
        info_str = "Station name: "+ data2['station_name'][i]
        +"<br>Number of charger: "+data2['n_charger'][i]
        "<br>Address: "+data2['address'][i]
        info2.push(info_str)
    }

    //console.log(data)
    // want to display rental, price, sqft, location
    var price = data['price'];
    var sqft = data['sqft'];
    var ratio = [];
    for(var i=0;i<price.length;i++){
        ratio.push(parseFloat(price[i])*1.0/parseFloat(sqft[i]));
    }
    //console.log(ratio)
    //return;
    size = size_vs_price(ratio);
    info = []
    for(var i=0;i<price.length;i++){
        info_str = "Rental price: "+price[i]+
        "$<br>Sqft: "+sqft[i]+
        "<br>Address: "+data['address'][i]
        info.push(info_str)
    }

    plot1(data['lat'], data['lon'], size, info, data2['lat'], data2['lon'], size2, info2);
    return;
})});

function size_vs_price(ratio_price_sqft){
    var max_size = 25
    var max = Math.max.apply(Math,ratio_price_sqft);
    var min = Math.min.apply(Math,ratio_price_sqft);

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

function plot1(lat,lon,size,info, lat2, lon2, size2, info2){
    var data1 = {
        type:'scattermapbox',
        lat:lat,
        lon:lon,
        mode:'markers',
        marker: {
        opacity:0.7,
        line:{
            color:"rgb(255,255,255)",
            width:12
        },
        size:size
        },
        text:info,
        name:'Rental properties'
    };

    var data2 = {
        type:'scattermapbox',
        lat:lat2,
        lon:lon2,
        mode:'markers',
        marker: {
        color:'red',
        opacity:0.7,
        line:{
            color:"rgb(255,255,255)",
            width:12
        },
        size:size2
        },
        text:info2,
        name:'Charging station'
    };
    
    var layout = {
        autosize: true,
        hovermode:'closest',
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
            t: 40,
            b: 20,
            l: 20,
            pad: 0
        }
    }
    
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
    })
    var all_data = [data1,data2];
    
    Plotly.plot('plt1', all_data, layout)
}