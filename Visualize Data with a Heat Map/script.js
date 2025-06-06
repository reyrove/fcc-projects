const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const margin = { top: 60, right: 40, bottom: 100, left: 80 };
const width = 1000 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

const svg = d3
  .select("#heat-map")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id", "svg")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("#tooltip");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const baseTemp = data.baseTemperature;
    const monthlyData = data.monthlyVariance;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const years = monthlyData.map((d) => d.year);
    const minYear = d3.min(years);
    const maxYear = d3.max(years);

    const xScale = d3
      .scaleBand()
      .domain(years.filter((v, i, a) => a.indexOf(v) === i))
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(months)
      .range([0, height]);

    const temps = monthlyData.map((d) => d.variance + baseTemp);
    const minTemp = d3.min(temps);
    const maxTemp = d3.max(temps);

    const colorScale = d3
      .scaleThreshold()
      .domain([
        minTemp,
        minTemp + (maxTemp - minTemp) / 4,
        minTemp + (maxTemp - minTemp) / 2,
        minTemp + (3 * (maxTemp - minTemp)) / 4,
      ])
      .range([
        "#313695",
        "#74add1",
        "#ffffbf",
        "#f46d43",
        "#a50026",
      ]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(
        xScale.domain().filter((year) => year % 10 === 0) 
      )
      .tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").attr("id", "y-axis").call(yAxis);

    svg
      .selectAll(".cell")
      .data(monthlyData)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", (d) => d.month - 1) 
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => d.variance + baseTemp)
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(months[d.month - 1]))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.variance + baseTemp))
      .on("mouseover", (event, d) => {
        const html = `
          <strong>${d.year} - ${months[d.month - 1]}</strong><br/>
          Temperature: ${(baseTemp + d.variance).toFixed(2)}°C<br/>
          Variance: ${d.variance.toFixed(2)}°C
        `;
        tooltip
          .attr("data-year", d.year)
          .html(html)
          .style("opacity", 0.9)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 40 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    const legendWidth = 400;
    const legendHeight = 40;

    const legendSvg = d3
      .select("#legend")
      .append("svg")
      .attr("width", legendWidth)
      .attr("height", legendHeight);

    const legendThresholds = colorScale.domain();
    const legendColors = colorScale.range();

    const legendScale = d3
      .scaleLinear()
      .domain([minTemp, maxTemp])
      .range([0, legendWidth - 50]);

    const legendAxis = d3
      .axisBottom(legendScale)
      .tickValues(legendThresholds)
      .tickFormat(d3.format(".1f"));

    const legendRectsWidth = (legendWidth - 50) / legendColors.length;

    legendSvg
      .selectAll("rect")
      .data(legendColors)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * legendRectsWidth)
      .attr("y", 0)
      .attr("width", legendRectsWidth)
      .attr("height", legendHeight - 30)
      .attr("fill", (d) => d);

    legendSvg
      .append("g")
      .attr("id", "legend-axis")
      .attr("transform", `translate(0,${legendHeight - 30})`)
      .call(legendAxis);
  });