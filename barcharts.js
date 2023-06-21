let set3=["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"];

function cPal(num){
  let cArr=[];
  for(let cnt=0;cnt<num;cnt++){
    cArr.push(set3[cnt%set3.length]);
  }
  return cArr;
}


function showRegion(reg){
d3.select("#canvas_bars").remove();

let cnt_lst=countries[reg];

console.log(cnt_lst);
let canvas_bars = d3.select("body")
    .append("svg")
    .attr("id","canvas_bars");
let toolTip=d3.select("body").append("div").style("visibility","hidden").style("position","absolute").attr("id","tooltip");
let w_s=window.innerWidth;
let h_s=window.innerHeight;

let w=0.9*w_s;
let h=0.7*h_s; 

let pad_t=Math.floor(h/9);
let pad_b=Math.floor(h/3.8);
if(w>h){
  //pad_t=Math.floor(w/11);
  pad_b=Math.floor(h/2.2);
}
let pad=Math.floor(w/12);

let l=cnt_lst.length<10?10:cnt_lst.length;
let mouseover = (d,i)=>{

toolTip.style("visibility","visible").html(i[0]+"<br>" + i[1]).style("background-color","#ffffe0").style("color","darkblue").style("border","1px solid darkblue").style("width",0.18*w+"px").style("text-align","center").style("display","block").style("top",0.65*h+"px").style("left",0.05*w+xScale(i[0])+"px").style("font",`${0.5*(0.13*w/Math.sqrt(1.3*l)+0.13*h/Math.sqrt(1.3*l))}px arial`);}
function colorAttr(c){
  for(let i=0;i<cnt_lst.length;i++){
    if(c==cnt_lst[i]){
      return cPal(cnt_lst.length)[i];
    }
  }
}

let xScale=d3.scaleBand().domain(cnt_lst).range([pad,w-pad]);

let yScale=d3.scaleLinear().domain([0,10]).range([0,h-pad_t-pad_b]);

let yAxisScale=d3.scaleLinear().domain([0,10]).range([h-pad_b,pad_t]); 

let xAxis=d3.axisBottom(xScale).ticks(cnt_lst.length);
let yAxis=d3.axisLeft(yAxisScale).tickFormat(d3.format('d'));

canvas_bars.append('g').call(xAxis).attr('transform','translate(0,'+(h-pad_b)+')').selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-58)").style("font",`${0.5*(0.1*w/Math.sqrt(1.2*l)+0.1*h/Math.sqrt(1.2*l))}px arial`);
canvas_bars.append('g').call(yAxis).attr('id','y-axis').attr('transform','translate('+pad+','+0*pad+')').style("font",`${0.5*(0.1*w/Math.sqrt(1.3*l)+0.1*h/Math.sqrt(1.3*l))}px arial`);
canvas_bars.selectAll('rect').data(vals22[reg]).enter().append('rect').attr('class','bar').attr('width', (w-2*pad)/(cnt_lst.length)).
attr('height',(item)=>{return yScale(item[1])}).attr('x',(item)=>{return xScale(item[0])}).attr('y',(item)=>{ return  h-pad_b-yScale(item[1])}).attr("fill",(item)=>colorAttr(item[0])).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});}
showRegion("Western Europe");

d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(['Western Europe', 'North America and ANZ', 'Middle East and North Africa', 'Latin America and Caribbean', 'Central and Eastern Europe', 'East Asia', 'Southeast Asia', 'Commonwealth of Independent States', 'Sub-Saharan Africa', 'South Asia'])
      .enter()
    	.append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; })

                                      function update(selectedGroup) {   
   showRegion(selectedGroup);
}  
  d3.select("#selectButton").on("change", function(d) {
        let selectedOption = d3.select(this).property("value")
        update(selectedOption)});