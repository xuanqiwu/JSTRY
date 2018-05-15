//html
<!DOCTYPE html>
<meta charset = "utf-8">
<style>
    body {font: 12px Arial;}
    path{
        stroke: steelblue;
        stroke-width: 2;
        fill: none;
    }
    .axis path,
    .axis line{
        fill: none;
        stroke: grey;
        stroke.width: 1;
        shape-rendering: crispEdges;
    }
</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>
//set the margins and graph area
var margin = {top: 30, right: 20, bottom: 30, left: 50}, width = 600 - margin.left - margin.right, height = 270 - margin.top - margin.bottom;
// setting the ranges
var x = d3.time.d3.scale().range([0,width]);
var y = d3.scale.linear().range([height,0]);
//setting up axes
//main function d3.svg.axis
var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
var yAxis = d3.svg.axis(),scale(y).orient("left").ticks(5);

//adding data to the line function
//main function d3.svg.line
var valueline = d3.svg.line().x(function(d){return x(d.date); })
.y(function(d){return y(d.close); });

//adding svg canvas
var svg = d3.select("body").append("svg")
.attr('width', width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//getting the data
d3.csv('/Users/kassia_qiqi/Desktop/trydata.csv', function(error,data){
    data.forEach(function(d){
        d.date = parseDate(d.date); // recognize the date
        d.close = +d.close; // turn it into numeric
});

//scale the range of data
x.domain(d3.extent(data,function(d){return d.date; })); //extent:find the min and max
y.domain(d3.extent(data,function(d){return d.close; }));


//actually drawing something
//add the valueline path
svg.append("path").attr('d', valueline(data));

svg.append("g").attr("class","x axix") // adding x axis
.attr("transform", "translate(0" + height + ")")
.call(xAxis);

svg.append("g").attr("class", "y axis").call("yAxis"); // adding y axis
});

</script>
</body>