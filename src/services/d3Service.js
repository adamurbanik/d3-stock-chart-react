import * as d3 from "d3";

class D3Service {
  constructor(data) {
    this.parseDate = d3.timeParse('%Y-%m-%d');

    this.stockNumber = 1;
    this.chartNumber = 1;
    this.stockDomains = {};
    this.domains = {};
    this.stockData = {};
    this.selectedStockID = 1;
    this.stockDomainsX = [];
    this.stockDomainsY = [];
    this.domainsX = [];
    this.domainsY = [];
    this.focuses = [];
    this.stocksIds = [];

    this.prepareStock();
    this.setStock(`area${this.selectedStockID}`);
    this.getStockData(data);
    this.prepareChart();
    this.getChartData(data);
  }

  setStock(stock) {
    this.selectedStockID = stock;
  }

  prepareStock() {
    this.svg = d3.select('.svg-stock');
    this.marginStock = { top: 60, right: 20, bottom: 100, left: 40 };
    this.widthStock =
      +this.svg.attr('width') - this.marginStock.left - this.marginStock.right;
    this.heightStock =
      +this.svg.attr('height') - this.marginStock.top - this.marginStock.bottom;

    this.parseDate = d3.timeParse('%Y-%m-%d');

    this.xStock = d3.scaleTime().range([0, this.widthStock]);
    this.yStock = d3.scaleLinear().range([this.heightStock, 0]);

    this.xAxisStock = d3.axisBottom(this.xStock);
    this.yAxisStock = d3.axisLeft(this.yStock);

    this.brush = d3
      .brushX()
      .extent([
        [0, 0],
        [this.widthStock, this.heightStock]
      ])
      .on('brush end', this.brushed.bind(this));

    this.areaStock = d3
      .area()
      .curve(d3.curveMonotoneX)
      .x(d => this.xStock(d.date))
      .y0(this.heightStock)
      .y1(d => this.yStock(d.high));

    this.valueline = d3
      .line()
      .x(d => this.xStock(d.date))
      .y(d => this.yStock(d.high));

    this.context = this.svg
      .append('g')
      .attr('class', 'context')
      .attr(
        'transform',
        'translate(' + this.marginStock.left + ',' + this.marginStock.top + ')'
      );
  }

  getStockData(data) {
      data.forEach(d => {
        d.date = this.parseDate(d[0]);
        d.high = +d[2];
        d.low = +d[3];
      });

      this.xStock.domain(
        d3.extent(data, function(d) {
          return d.date;
        })
      );
      this.yStock.domain([
        d3.min(data, function(d) {
          return d.low;
        }),
        d3.max(data, function(d) {
          return d.high;
        })
      ]);

      this.stockDomainsX.push(this.xStock);
      this.stockDomainsY.push(this.yStock);

      let classNames = `line line${this.stockNumber}`;
      this.context
        .append('path')
        .datum(data)
        .attr('class', classNames)
        .attr('d', this.valueline);

      if (this.stockNumber++ === 1) {
        this.context
          .append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + this.heightStock + ')')
          .call(this.xAxisStock);

        this.context
          .append('g')
          .attr('class', 'axis axis--y')
          .call(this.yAxisStock);
      }

      this.stockData[this.selectedStockID] = data;
      this.stocksIds.push(this.selectedStockID);
  }

  prepareChart() {
    this.svgChart = d3.select('.svg-chart');

    this.margin = { top: 20, right: 20, bottom: 110, left: 40 };
    this.width =
      +this.svgChart.attr('width') - this.margin.left - this.margin.right;
    this.height =
      +this.svgChart.attr('height') - this.margin.top - this.margin.bottom;

    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);

    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y);

    this.zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [this.width, this.height]
      ])
      .extent([
        [0, 0],
        [this.width, this.height]
      ])
      .on('zoom', this.zoomed.bind(this));

    this.area = d3
      .area()
      .curve(d3.curveMonotoneX)
      .x(d => this.x(d.date))
      .y0(this.height)
      .y1(d => this.y(d.high));

    this.svgChart
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);

    this.focus = this.svgChart
      .append('g')
      .attr('class', 'focus')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  getChartData() {
    var data = this.stockData[this.selectedStockID];
    this.x.domain(
      d3.extent(data, function(d) {
        return d.date;
      })
    );
    this.y.domain([
      d3.min(data, function(d) {
        return d.low;
      }),
      d3.max(data, function(d) {
        return d.high;
      })
    ]);
    this.domains[this.selectedStockID] = this.x;

    this.domainsX.push(this.x);
    this.domainsY.push(this.y);

    this.focus
      .append('path')
      .datum(data)
      .attr('class', `area${this.chartNumber}`)
      .attr('d', this.area);

    if (this.chartNumber++ === 1) {
      this.focus
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(this.xAxis);

      this.focus
        .append('g')
        .attr('class', 'axis axis--y')
        .call(this.yAxis);

      this.svgChart
        .append('rect')
        .attr('class', 'zoom')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr(
          'transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')'
        )
        .call(this.zoom);

      this.context
        .append('g')
        .attr('class', 'brush')
        .call(this.brush)
        .call(this.brush.move, this.xStock.range());
    }
  }

  brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return;
    if (!this.focus) return;
    var s = d3.event.selection || this.xStock.range();

    this.domains['area1'].domain(s.map(this.xStock.invert, this.xStock));
    this.focus.select(`.${this.selectedStockID}`).attr('d', this.area);
    this.focus.select('.axis--x').call(this.xAxis);
    this.svgChart
      .select('.zoom')
      .call(
        this.zoom.transform,
        d3.zoomIdentity.scale(this.width / (s[1] - s[0])).translate(-s[0], 0)
      );

  }

  zoomed() {
    if (!this.domains[this.selectedStockID]) return;
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return;
    var t = d3.event.transform;

    this.domains[this.selectedStockID].domain(t.rescaleX(this.xStock).domain());

    this.focus.select(`.${this.selectedStockID}`).attr('d', this.area);
    this.focus.select('.axis--x').call(this.xAxis);
    this.context
      .select('.brush')
      .call(this.brush.move, this.x.range().map(t.invertX, t));
  }
}

export default D3Service;
