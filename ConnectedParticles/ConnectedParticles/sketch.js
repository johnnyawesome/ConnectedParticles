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
    particle.display();
  });
}

class Particle {
  constructor() {
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.xSpeed = Math.random() * 0.7;
    this.ySpeed = Math.random() * 0.7;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x <= 0) this.xSpeed *= -1;
    if (this.x > width) this.xSpeed *= -1;
    if (this.y <= 0) this.ySpeed *= -1;
    if (this.y > height) this.ySpeed *= -1;
  }

  connect() {
    particles.forEach(particle => {
      let distance = dist(this.x, this.y, particle.x, particle.y);
      if (distance < lineMaxDist) {

        stroke(color(0, 255, 0, map(distance, 0, lineMaxDist, 255, 0)));
        strokeWeight(map(distance, 0, lineMaxDist, 2, 0));
        line(this.x, this.y, particle.x, particle.y);
      }
    })
  }

  display() {
    noStroke();
    ellipse(this.x, this.y, particleSize)
  }
}