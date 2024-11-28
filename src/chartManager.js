const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { registerFont } = require('canvas');

const fs = require('fs');

registerFont('assets/DejaVuSans.ttf', { family: 'DejaVu Sans' });
const chartCallback = (ChartJS) => {
    ChartJS.defaults.font.family = 'DejaVu Sans';
};

// Create an instance of ChartJSNodeCanvas
const width = 400; // width of the image
const height = 400; // height of the image
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });


async function drawPieChart(members) {
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
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'DejaVu Sans', // Use the registered font
                        }
                    }
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

    // Save the image to a file

    const filePath = './pie-chart.png';
    fs.writeFileSync(filePath, image);
    console.log('Pie chart saved as pie-chart.png');
    return filePath;
}

async function createBarChart(members) {

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
        type: 'bar', // Bar chart type
        data: {
            labels: ['online', 'offline', 'dnd', 'idle'],
            datasets: [
                {
                    data: [onlineNums, offlineNums, dndNums, idleNums],
                    backgroundColor: ['#FF0000', '#0000FF', '#FFFF00', '#FFFFFF'],
                    borderColor: ['#FF0000', '#0000FF', '#FFFF00', '#FFFFFF'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: false, // Ensures the chart size matches the canvas
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'members-count',
                    },
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'DejaVu Sans', // Use the registered font
                        }
                    }
                }
            }
        },
    };

    // Render chart to a buffer
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

    // Save to file
    const filePath = './bar-chart.png'
    fs.writeFileSync(filePath, imageBuffer);
    console.log('Bar chart saved as bar-chart.png');
    return filePath;
}

module.exports = {
    drawPieChart,
    createBarChart
}
