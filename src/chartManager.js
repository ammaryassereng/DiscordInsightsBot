const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

// Create an instance of ChartJSNodeCanvas
const width = 400; // width of the image
const height = 400; // height of the image
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

module.exports = async function drawPieChart(members) {

    let onlineNums = 0;
    let offlineNums = 0;
    let dndNums = 0;
    let idleNums = 0;

    members.map(member => {
        if (member.presence) {
            if (member.presence.status === 'online')
                onlineNums += 1;
            else if (member.presence.status === 'dnd')
                dndNums += 1;
            else if (member.presence.status === 'idle')
                idleNums += 1;
        }
        else {
            offlineNums += 1;
        }
    });

    const configuration = {
        type: 'pie', // Pie chart type
        data: {
            labels: ['online', 'offline', 'dnd', 'idle'], // Labels for each section
            datasets: [{
                data: [onlineNums, offlineNums, dndNums, idleNums], // Data for each section
                backgroundColor: ['#FF0000', '#0000FF', '#FFFF00', '#FFFFFF'], // Colors for each section
            }]
        },
        options: {
            responsive: true,
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

    // Save the image to a file

    const filePath = './pie-chart.png';
    fs.writeFileSync(filePath, image);
    console.log('Pie chart saved as pie-chart.png');
    return filePath;
} 
