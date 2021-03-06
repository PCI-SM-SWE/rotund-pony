/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Graphtype = require('../api/graphtype/graphtype.model');
var Paramtype = require('../api/paramtype/paramtype.model');

Thing.find({}).remove(function() {
  Thing.create({
    name: 'Data Source Integration',
    info: 'Consume data from multiple different sources including: MySQL, Hadoop, some other fancy thing!'
  }, {
    name: 'Powerful Insight',
    info: 'Filter large data sets to see what really matters!'
  }, {
    name: 'Elegant Visualizations',
    info: 'Beautiful graphs guide analysis!'
  }, {
    name: 'Scalability',
    info: 'One-click network set-up!'
  }, {
    name: 'Security',
    info: 'Your data is secure if you choose to upload it!'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  });
});

Graphtype.find({}).remove(function() {
  Graphtype.create({
    type: 'discreteBar',
    formalName: 'Bar Chart',
    params: ['label', 'value'],
    learnMore: 'https://en.wikipedia.org/wiki/Bar_chart',
    description: 'A bar chart or bar graph is a chart with rectangular bars with lengths proportional to the values that they represent. The bars can be plotted vertically or horizontally. A vertical bar chart is sometimes called a column bar chart.'
  }, {
    type: 'line',
    formalName: 'Line Chart',
    params: ['x', 'y'],
    learnMore: 'https://en.wikipedia.org/wiki/Line_chart',
    description: 'A line chart or line graph is a type of chart which displays information as a series of data points called "markers" connected by straight line segments. Line Charts show how a particular data changes at equal intervals of time. '
  }, {
    type: 'pie',
    formalName: 'Pie Chart',
    params: ['label', 'value'],
    learnMore: 'https://en.wikipedia.org/wiki/Pie_chart',
    description: 'A pie chart is divided into sectors, illustrating numerical proportion. In a pie chart, the arc length of each sector (and consequently its central angle and area), is proportional to the quantity it represents.'
  }, {
    type: 'scatter',
    formalName: 'Scatterplot',
    params: ['x', 'y'],
    learnMore: 'https://en.wikipedia.org/wiki/Scatter_plot',
    description: 'A scatter plot, scatterplot, or scattergraph is a type of mathematical diagram using Cartesian coordinates to display values for two variables for a set of data. The data is displayed as a collection of points, each having the value of one variable determining the position on the horizontal axis and the value of the other variable determining the position on the vertical axis.'
  });
});

Paramtype.find({}).remove(function() {
  Paramtype.create({
    name: 'label',
    type: 'string',
    display: 'Label',
    required: true,
    help: 'This is the X-axis for bar charts or category for pie charts. Can be any type of value.'
  }, {
    name: 'x',
    type: 'mixed',
    display: 'X Axis',
    required: true,
    help: 'Numbers and timestamps work best for this field.'
  }, {
    name: 'y',
    type: 'mixed',
    display: 'Y Axis',
    required: true,
    help: 'Numbers and timestamps work best for this field.'
  }, {
    name: 'value',
    type: 'number',
    display: 'Value',
    required: true,
    help: 'This is the Y-axis for bar charts and count for pie charts.'
  });
});