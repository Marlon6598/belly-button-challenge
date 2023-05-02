var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function Plots(id)
{
    d3.json(url).then(data =>
    {
        let samples = data.samples;
        let identifier = samples.filter(sample => sample.id == id);
        let filtered = identifier[0];
        let sample_values = filtered.sample_values.slice(0, 10).reverse();
        let otu_ids = filtered.otu_ids.slice(0, 10).reverse();
        let otu_labels = filtered.otu_labels.slice(0, 10).reverse();
        
        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
        let barTrace = {
            x: sample_values,
            y: otu_ids.map(object => "OTU " + object),
            type: "bar",
            name: otu_labels,
            orientation: "h"
        };
        let barLayout = {width: 400, height: 600};
        let barData = [barTrace];
        Plotly.newPlot("bar", barData, barLayout);

        // Create a bubble chart that displays each sample
        let bubbleTrace = {
            x: filtered.otu_ids,
            y: filtered.sample_values,
            mode: "markers",
            marker: {
                color: filtered.otu_ids,
                colorscale: "Viridis",
                size: filtered.sample_values
            },
            text: filtered.otu_labels,
        };
        let bubbleData = [bubbleTrace];
        let bubbleLayout = {
            xaxis: {title: "OTU ID"},
            width: 1200, height: 550
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    })
};

// Display the sample metadata, i.e., an individual's demographic information
// Display each key-value pair from the metadata JSON object somewhere on the page
function panelInfo(id)
{
    d3.json(url).then(data =>
    {
        let metaData = data.metadata;
        let identifier = metaData.filter(sample => {
            return sample.id.toString() == id})[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(identifier).forEach(([key, value]) =>
        {panel.append("h6").text(`${key}: ${value}`)});
    })
};

function optionChanged(id){Plots(id), panelInfo(id)};

function init()
{
    let dropDown = d3.select("#selDataset");
    let id = dropDown.property("value");
    d3.json(url).then(data =>
    {
        let names = data.names;
        Object.values(names).forEach(value =>{
            dropDown.append("option").text(value)});
        panelInfo(names[0]);
        Plots(names[0])
    })
};

init();