var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function panelInfo(id)
{
    d3.json(url).then(data =>
        {
            let metaData = data.metadata;
            let identifier = metaData.filter(sample =>{
            return sample.id.toString() == id})[0];
            let panel = d3.select("#sample-metadata");
            panel.html("");
            Object.entries(identifier).forEach(([key, value]) =>{
                panel.append("h6").text(`${key}: ${value}`)});
            
        let gaugeTrace = {
            domain: {x: [0, 5], y: [0, 1]},
            ids: ["0-1", "1-2", "2-3", "3-4", "5-6", "6-7", "7-8", "8-9"],
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: {range: [0, 9], tickmode: "linear"},
                steps:
                [
                    {range: [0,1], color: "rgb(248,243,236)"},
                    {range: [1,2], color: "rgb(244,241,229)"},
                    {range: [2,3], color: "rgb(233,230,202)"},
                    {range: [3,4], color: "rgb(229,231,179)"},
                    {range: [4,5], color: "rgb(213,228,157)"},
                    {range: [5,6], color: "rgb(183,204,146)"},
                    {range: [6,7], color: "rgb(140,191,136)"},
                    {range: [7,8], color: "rgb(138,187,143)"},
                    {range: [8,9], color: "rgb(133,180,138)"},
                ]
            }
        };
        let deg = 20 * identifier.wfreq;
        let radians = (deg * Math.PI) / 180;
        let x = -1 * 0.5 * Math.cos(radians);
        let y = 0.5 * Math.sin(radians);
        let gaugeLayout = {
            title: "<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week</br>", font: {size: 14, family: "Calibri"},
            shapes: [{
                type: "line",
                x0: 0.5,
                y0: 0,
                x1: x + 0.5,
                y1: y + 0.5,
                line: {color: "maroon", width: 6}
            }],
            xaxis: {visible: true, range: [-1, 1]},
            yaxis: {visible: true, range: [-1, 1]},
            width: 500,
            height: 350
        };
        Plotly.newPlot("gauge", [gaugeTrace], gaugeLayout);
    })
};