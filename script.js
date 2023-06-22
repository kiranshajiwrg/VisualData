// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Retrieve data from the Google Sheet and create the pie chart
function drawChart() {
  // Fetch data from the Google Sheet
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1JYKTE8oi4-LzrlNdx8At3vBk08NQQS45fsqNWhKTw48/values/Sheet1?key=AIzaSyCPgYVueYh3yV3Uei_Z6-O072LTHJJIl1I')
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      const headers = rows.shift();

      // Find the indices of the required columns
      const projectIndex = headers.indexOf('Project Name');
      const techStackIndex = headers.indexOf('TechStack');
      const statusIndex = headers.indexOf('Status');
      const TypeIndex = headers.indexOf('Type');

      // Filter the data based on the given conditions (InProgress)
      const filteredProjecttypeData = rows.filter(row => row[statusIndex] === 'In progress');

      // Group the data by project name and count the occurrences
      const projecttypeCounts = {};
      filteredProjecttypeData.forEach(row => {
        const typeProjectName = row[TypeIndex];
        projecttypeCounts[typeProjectName] = (projecttypeCounts[typeProjectName] || 0) + 1;
      });

      // Prepare the data for the chart
      const projecttypechartData = Object.entries(projecttypeCounts).map(([project, count]) => [project, count]);

      // Create the data table
      const dataProjectTypeTable = new google.visualization.DataTable();
      dataProjectTypeTable.addColumn('string', 'Project Name');
      dataProjectTypeTable.addColumn('number', 'Count');
      dataProjectTypeTable.addRows(projecttypechartData);

      // Set chart options
      const projectcategoryoptions = {
        title: 'Project Category Percentage',
        is3D: true,
        width: 600,
        height:400
      };

      // Create and draw the chart
      const projecttypechart = new google.visualization.PieChart(document.getElementById('chart_div'));
      projecttypechart.draw(dataProjectTypeTable, projectcategoryoptions);
      
    // Filter the data based on the given conditions (TechSTack & InProgress)
    const filteredTechStacktypeData = rows.filter(row => row[statusIndex] === 'In progress');

    // Group the data by project name and count the occurrences
    const techStackCounts = {};
    filteredTechStacktypeData.forEach(row => {
    const techstackname = row[techStackIndex];
    techStackCounts[techstackname] = (techStackCounts[techstackname] || 0) + 1;
    });

    // Prepare the data for the chart
    const chartData = Object.entries(techStackCounts).map(([project, count]) => [project, count]);

    // Create the data table
    const dataTechStackTable = new google.visualization.DataTable();
    dataTechStackTable.addColumn('string', 'Project Name');
    dataTechStackTable.addColumn('number', 'Count');
    dataTechStackTable.addRows(chartData);

    // Set chart options
    const options = {
    title: 'TechStack Percentage',
    is3D: true,
    width: 600,
    height:400
    };

    // Create and draw the chart
    const chart = new google.visualization.PieChart(document.getElementById('techstack_div'));
    chart.draw(dataTechStackTable, options);
        
        })
        .catch(error => {
        console.error('Error retrieving data:', error);
        });
}