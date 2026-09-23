
  // RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 42,     // Changed the seed to match your cosmic theme!
};

export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 24;

  // Header Title
  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(28);
  p.text("COSMIC DANCE", w / 2, 30); // You can change this title text to whatever you want!

  dashedLine(p, margin, 94, w - margin, 94, 6, 5);

  // 1. THE AURORA LIGHTS (Wavy vertical and diagonal ribbons of light)
  // Thermal printers only print black or white, so we simulate shimmering curtains using alternating lines!
  p.stroke(0);
  for (let x = margin; x < w - margin; x += 3) {
    // Noise generates beautiful organic waves across the sky
    const wave1 = p.noise(x * 0.015, 10) * 180;
    const wave2 = p.noise(x * 0.02, 50) * 220;
    
    p.strokeWeight(p.random([1, 2]));
    // Draw fine vertical lines that look like a curtain of glowing light
    p.line(x, 120 + wave1, x, 250 + wave2);
  }

  // 2. THE MILKY WAY GALAXY BAND (A dense, diagonal cluster of stellar dust)
  p.noStroke();
  p.fill(0);
  for (let i = 0; i < 800; i += 1) {
    // Generate random coordinates concentrated along a diagonal path across the sky
    const steps = p.random(0, 1);
    const targetX = p.lerp(margin, w - margin, steps);
    const targetY = p.lerp(150, 450, steps) + p.randomGaussian(0, 35); // Pushes points toward the center band
    
    if (targetX > margin && targetX < w - margin && targetY > 110 && targetY < 550) {
      const clusterSize = p.random([1, 1, 1, 2]);
      p.rect(targetX, targetY, clusterSize, clusterSize);
    }
  }

  // 3. CLEAR NIGHT SKY STARS & CROSS CONSTELLATIONS
  // Adds background crisp stars that aren't part of the main galaxy band
  for (let i = 0; i < 120; i += 1) {
    const x = p.random(margin, w - margin);
    const y = p.random(110, 550);
    const starSize = p.random([1, 1, 2, 2, 3]);
    
    // Occasionally make a larger 4-pointed twinkling star
    if (p.random() > 0.94) {
      p.rect(x - 4, y, 9, 1);
      p.rect(x, y - 4, 1, 9);
    } else {
      p.rect(x, y, starSize, starSize);
    }
  }

  // A crisp horizon dividing line below our vast night sky canvas
  dashedLine(p, margin, 580, w - margin, 580, 4, 4);

  // 4. THE LANDSCAPE SIGNAL ROUTE (Winding pathway towards the barcode)
  p.noFill();
  p.stroke(0);
  p.strokeWeight(4);
  p.beginShape();
  const route = [];
  for (let y = 620; y < 900; y += 30) {
    const x = p.map(p.noise(y * 0.025, 80), 0, 1, margin + 40, w - margin - 40);
    route.push({ x, y });
    p.vertex(x, y);
  }
  p.endShape();

  // Draw node points along your trajectory line
  p.strokeWeight(2);
  p.fill(255);
  route.forEach(({ x, y }, index) => {
    if (index % 2 === 0) {
      p.circle(x, y, 10);
      p.line(index % 4 === 0 ? margin : w - margin, y, x, y);
    }
  });

  dashedLine(p, margin, 930, w - margin, 930, 6, 5);

  // Barcode data configurations
  const barcodeValue = "COSMIC-RECEIPT-2026"; // You can replace this text with your name or any word!
  drawBarcode(p, barcodeValue, w / 2, 960);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(11);
  p.text(barcodeValue, w / 2, 1024);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
  
