/* dra a brown wooden boat whith a white sail on top of a blue ocean
- the sky is light blue with one white cloud
- the cloud has three different sized circles that overlap each other
- the sun is a yellow circle inside a yellow-orange circle inside an orange circle in the top right corner
- the sail is a large white triangle connected to the top of the dark brown mast down to the tip of the front
- the boat is a curved at the bottom an has a dark brown rectangle for the body
*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // draw the ocean
  fill(0, 0, 255);  
  rect(0, 300, 400, 100);

  // draw the boat body
  fill(139, 69, 19);
  rect(100, 200, 200, 100, 50);

  // draw the mast
  fill(139, 69, 19);
  rect(200, 100, 10, 100);

  // draw the sail
  fill(255, 255, 255);
  triangle(200, 100, 200, 200, 300, 200);

  // draw the cloud
  fill(255, 255, 255);
  ellipse(100, 100, 50, 50);
  ellipse(125, 100, 75, 75);
  ellipse(150, 100, 50, 50);

  // draw the sun
  fill(255, 165, 0);
  ellipse(350, 50, 100, 100);
  fill(255, 165, 0);
  ellipse(350, 50, 75, 75);
  fill(255, 69, 0);
  ellipse(350, 50, 50, 50);
}