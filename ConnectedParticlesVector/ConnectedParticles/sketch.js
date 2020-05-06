/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//Diameter of one particle
let particleSize = 3;
//Total particles
let particleSum = 80;
//Distance the line gets drawn
let lineMaxDist = 100;
let particles = [];

function setup() {
  createCanvas(650, 650, P2D);
  stroke(0, 255, 0);
  fill(0, 255, 0);

  //Fills the array "particles" with particles
  for (let i = 0; i < particleSum; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 150);
  //Move and display particles
  particles.forEach(particle => {
    particle.move();
    particle.connect();
    particle.repel();
    particle.display();
  });
}

class Particle {
  constructor() {
    this.pos = createVector(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    this.direction = createVector(Math.random() * 0.7, Math.random() * 0.7);
  }

  //Moves the particles and bounces them off the edges
  move() {
    this.pos = this.pos.add(this.direction);

    if (this.pos.x <= 0) this.direction.x *= -1;
    if (this.pos.x > width) this.direction.x *= -1;
    if (this.pos.y <= 0) this.direction.y *= -1;
    if (this.pos.y > height) this.direction.y *= -1;
  }

  //Mouse repels particles
  //Also makes sure they don't leave the canvas
  repel() {
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    let mouse = createVector(mouseX, mouseY);
    let difference = p5.Vector.sub(mouse, this.pos);
    difference.setMag(1);

    //If the mouse comes near a particle, it moves away
    if (distance < 100) {
      this.pos.sub(difference);
    }
  }

  //Connects particles with a line, if they're close enough
  connect() {
    particles.forEach(particle => {
      let distance = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (distance < lineMaxDist) {

        stroke(color(0, 255, 0, map(distance, 0, lineMaxDist, 255, 0)));
        strokeWeight(map(distance, 0, lineMaxDist, 2, 0));
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    })
  }

  display() {
    noStroke();
    ellipse(this.pos.x, this.pos.y, particleSize)
  }
}