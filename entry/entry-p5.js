import p5 from 'p5';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
const sketch = (p) => {
  p.setup = () => {
    //Create the p5 canvas
    var width = 500,
      height = 300,
      margin = 30;

    var c = p.createCanvas(width + margin * 2, height + margin * 2);
    c.parent('example-recipe');
    p.stroke('#fff');

    //Set the output range of the different scales.
    var radius = 10,
      maxRadius = 70,
      startColor = '#033E8C',
      midColor = '#00D96F',
      endColor = '#F2B705';

    /*
      Create the three different scales used in this example. Each scale returns a function. So the variable d3xScale can be used as if it were a function such as d3xScale(.5)
      */
    var d3xScale = scaleLinear()
      .domain([0, 1])
      .range([margin, margin + width]);

    var d3colorScale = scaleLinear()
      .domain([0, 0.5, 1])
      .range([startColor, midColor, endColor]);

    var d3radiusScale = scaleLinear().domain([0, 1]).range([radius, maxRadius]);

    /*
      Create a for loop and draw an ellipse using p5's drawing syntax.
      */
    for (var i = 0; i < 1; i += 0.01) {
      var scaledX = d3xScale(i);
      var scaledColor = d3colorScale(i);
      var scaledRadius = d3radiusScale(i);
      p.fill(scaledColor);
      p.ellipse(scaledX, maxRadius, scaledRadius, scaledRadius);
    }

    //Add a title
    p.fill('#000');
    p.noStroke();
    p.textSize(15);
    p.text('Using D3.js scales in a p5 sketch', 30, 30);
  };
};
export default function() {
  new p5(sketch);
}
