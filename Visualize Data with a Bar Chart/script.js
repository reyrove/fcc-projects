const svg = d3.select("svg");
const width = +svg.attr("width") - 80;  
const height = +svg.attr("height") - 80; 
const margin = { top: 40, right: 40, bottom: 40, left: 80 };

const tooltip = d3.select("#tooltip");

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    const dataset = data.data;

    const dates = dataset.map(d => new Date(d[0]));
    const gdps = dataset.map(d => d[1]);

    const xScale = d3.scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(gdps)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    g.append("g")
      .attr("id", "y-axis")
      .call(yAxis);

    const barWidth = width / dataset.length;

    g.selectAll(".bar")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(new Date(d[0])))
      .attr("y", d => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", d => height - yScale(d[1]))
      .attr("data-date", d => d[0])
      .attr("data-gdp", d => d[1])
      .on("mouseover", function(event, d) {
        tooltip.style("opacity", 1)
          .html(`<strong>${d[0]}</strong><br/>$${d[1].toLocaleString()} Billion`)
          .attr("data-date", d[0]);

        const tooltipWidth = tooltip.node().offsetWidth;
        const tooltipHeight = tooltip.node().offsetHeight;
        let left = event.pageX + 10;
        let top = event.pageY - tooltipHeight - 10;

        if(left + tooltipWidth > window.innerWidth) {
          left = event.pageX - tooltipWidth - 10;
        }
        if(top < 0) {
          top = event.pageY + 10;
        }
        tooltip.style("left", left + "px")
          .style("top", top + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  });