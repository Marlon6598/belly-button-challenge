const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function panelInfo(id) {
    d3.json(url).then(function (data)
    {
        let sampleData = data;
        let metadata = sampleData.metadata;
        let identifier = metadata.filter(sample =>
            sample.id.toString() === id)[0];
        let panel = d3.select('#sample-metadata');
        panel.html("");
        Object.entries(identifier).forEach(([key, value]) => {panel.append('h6').text(`${key}: ${value}`);})
    })
};