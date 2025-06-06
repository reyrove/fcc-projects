const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const width = 900;
const height = 500;
const padding = 60;

const svg = d3.select("#scatterplot")
  .attr("width", width)
  .attr("height", height);


const tooltip = d3.select("#tooltip");

d3.json(url).then(data => {

  data.forEach(d => {

    d.Year = +d.Year;

    const parsedTime = d.Time.split(":");
    d.TimeDate = new Date(1970, 0, 1, 0, +parsedTime[0], +parsedTime[1]);
  });

  const xMin = d3.min(data, d => d.Year - 1);
  const xMax = d3.max(data, d => d.Year + 1);

  const yMin = d3.min(data, d => d.TimeDate);
  const yMax = d3.max(data, d => d.TimeDate);

  const xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([padding, width - padding]);

  const yScale = d3.scaleTime()
    .domain([yMin, yMax])
    .range([padding, height - padding]);

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"))
    .ticks(data.length / 2);

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.timeFormat("%M:%S"));

  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);

  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

  svg.selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => yScale(d.TimeDate))
    .attr("r", 6)
    .attr("data-xvalue", d => d.Year)
    .attr("data-yvalue", d => d.TimeDate.toISOString())
    .attr("fill", d => d.Doping === "" ? "green" : "red")
    .on("mouseover", (event, d) => {
      tooltip.style("opacity", 0.9);
      tooltip.attr("data-year", d.Year);
      tooltip.html(
        `<strong>${d.Name}</strong>: ${d.Nationality}<br/>
        Year: ${d.Year}, Time: ${d.Time}<br/>
        ${d.Doping ? d.Doping : "No doping allegations"}`
      )
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  const legend = d3.select("#legend");

  const legendHTML = `
    <span style="color: green;">&#9679;</span> No doping allegations &nbsp;&nbsp;&nbsp;
    <span style="color: red;">&#9679;</span> Doping allegations
  `;

  legend.html(legendHTML);
});