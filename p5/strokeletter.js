const socket = io.connect($OP.getEchoServerURL(1615630));

const userStates = new Map(); // state from other people's hovering letters
let userID;

let center_brush = false;
OPC.slider("brush_size", 48, 8, 200, 1);
OPC.slider("brush_angle", 0, -180, 180, 5);
OPC.slider("brush_hue", 0, 0, 360, 5);
OPC.text("brush_string", "", "");
let brush_name;
OPC.button("change_name", "Change Name");

const randomBrushStrings = `!#$%&\()*+/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^abcdefghijklmnopqrstuvwxyz{}~`;

let
	newMouseX = 0,
	newMouseY = 0,
	oldMouseX = 0,
	oldMouseY = 0;
let statesToSkip = 0;



function buttonPressed(name) {
	if (name === "change_name") {
		selectName();
	}
}

function parameterChanged(name, value) {
	if (name === "brush_string") {
		if (value.length > 1) {
			brush_string = value[value.length - 1];
		} else if (value.length < 1) {
			pickRandomBrushString();
		}
	}
}

function keyPressed() {
	if (key.length === 1) {
		brush_string = key;
	}
}

function mousePressed() {
	newMouseX = mouseX - width / 2;
	newMouseY = mouseY - height / 2;
	oldMouseX = newMouseX;
	oldMouseY = newMouseY;
}



function setup() {
	OPC.collapse();
	pickRandomBrushString();
	userID = floor(random(0, Number.MAX_SAFE_INTEGER));

	const savedName = getItem("asciiOnlineUsername");
	if (savedName !== null) {
		brush_name = savedName;
	} else {
		selectName();
	}

	// right click us used to erase, remove context menu
	document.oncontextmenu = () => false;

	socket.on("state", (id, state) => {
		state.time = Date.now();
		userStates.set(id, state);
	});
	socket.on("draw", (state) => {
		drawState(true, 100, state);
	})

	canvas = createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	colorMode(HSL);

	// when mouse leaves canvas, display it in the center
	// makes it easy to customize size/angle
	canvas.mouseOut(() => {
		center_brush = true;
	});
	canvas.mouseOver(() => {
		center_brush = false;
		statesToSkip = 1;
		canvas.elt.focus();
	});

	// buffer where permanent drawing goes
	buffer = createGraphics(windowWidth, windowHeight);
	buffer.background(255);
	buffer.angleMode(DEGREES);
	buffer.colorMode(HSL);

	brush_hue = (80 + floor(random(80)) * 4) % 360; // random hue that is not between 40 and 80 (yellow)
}

function windowResized() {
	const
		width = window.innerWidth,
		height = window.innerHeight;

	resizeCanvas(width, height);

	const tempBuffer = createGraphics(width, height);
	tempBuffer.imageMode(CENTER);
	tempBuffer.image(buffer, width / 2, height / 2);

	buffer.resizeCanvas(width, height);
	buffer.background(255);

	buffer.image(tempBuffer, 0, 0, width, height);
}



function pickRandomBrushString() {
	brush_string = randomBrushStrings[Math.floor(Math.random() * randomBrushStrings.length)];
}

function selectName() {
	OpenProcessing.requestUserInfo(["fullname"], "Your username will identify you to others")
		.then(function(data) {
			if (data.fullname === "Guest User") {
				selectChosenName();
			} else {
				brush_name = data.fullname;
			}
		}, selectChosenName)
		.then(() => {
			storeItem("asciiOnlineUsername", brush_name);
		});
}

function selectChosenName(defaultName = generateRandomName()) {
	const chosenName = prompt(
		"What username would you like?\n(Must be 3 or more characters)",
		defaultName);
	if (typeof chosenName === "string") {
		if (chosenName.length >= 3) {
			brush_name = "*" + chosenName;
		} else {
			// invalid name, ask again
			selectChosenName(defaultName);
		}
	} else {
		// user pressed cancel
		if (brush_name === undefined) {
			// they still need a name, just give them the default
			brush_name = "*" + defaultName;
		}
	}
}

function generateRandomName() {
	return `Guest${floor(random(1000, 10000))}`;
}



function draw() {
	// center mouse to make it easy to customize size/angle
	if (center_brush) {
		// slide brush to the center of the screen
		newMouseX = newMouseX * 0.7;
		newMouseY = newMouseY * 0.7;
	} else {
		newMouseX = mouseX - width / 2;
		newMouseY = mouseY - height / 2;
	}

	const state = {
		x1: newMouseX,
		y1: newMouseY,
		x2: oldMouseX,
		y2: oldMouseY,
		displayBrush: true,
		windowWidth: width,
		windowHeight: height,
		brush_name: (brush_name == null ?
			`Loading${".".repeat(Date.now() / 500 % 4)}` :
			brush_name),
		brush_string,
		brush_hue,
		brush_erase: mouseButton === RIGHT && mouseIsPressed,
		brush_size,
		brush_angle
	}

	// draw permanently
	if (mouseIsPressed && !center_brush && statesToSkip <= 0) {
		drawState(true, 100, state);
		socket.emit("draw", state);
	}

	// display permanent drawing
	image(buffer, 0, 0, width, height);

	// fade permanent drawing
	if (frameCount % 3 === 0) {
		buffer.blendMode(ADD);
		buffer.background(0, 0, 100, 1 / 256);
		buffer.blendMode(BLEND);
	}

	// display temperary state of other users
	let i = 0;
	for (const userState of userStates.values()) {
		const age = Date.now() - userState.time;

		if (age > 3000) continue;

		const alpha = Math.pow((2500 - Math.max(0, age - 500)) / 2500, 2);

		drawState(false, alpha, userState);

		fill(userState.brush_hue, 100, 50, alpha * 0.2);
		circle(15, 15 + i * 30, 25);
		fill(userState.brush_hue, 100, 50, alpha * 0.4);
		circle(15, 15 + i * 30, 22);
		fill(userState.brush_hue, 100, 50, alpha);
		circle(15, 15 + i * 30, 19);

		push();
		textSize(12);
		textAlign(LEFT, CENTER);
		fill(0, 0, 0, alpha);
		text(userState.brush_name, 30, 16 + i * 30);
		pop();
		i++;
	}

	// give white box around brush for visability
	if (center_brush) {
		push();
		fill(0, 0, 100, 0.8);
		stroke(0, 0, 0);
		rectMode(CENTER);
		rect(width / 2, height / 2, brush_size * 1.4 + 2, brush_size * 1.4 + 2);
		pop();
	}

	// display temperary state of self
	drawState(false, 1, state);

	// set state to other users
	if (!center_brush && statesToSkip <= 0) {
		socket.emit("state", userID, state);
	} else {
		state.displayBrush = false;
		socket.emit("state", userID, state);
		state.displayBrush = true;
		statesToSkip--;
	}

	oldMouseX = newMouseX;
	oldMouseY = newMouseY;
}



function drawState(permanent, alpha, {
	x1,
	y1,
	x2,
	y2,
	windowWidth,
	windowHeight,
	displayBrush,
	brush_name,
	brush_string,
	brush_hue,
	brush_erase,
	brush_size,
	brush_angle
}) {
	// drawing to window uses global p5.js functions, like drawing to canvas
	const g = permanent ? buffer : window;

	if (!permanent) {
		g.push();
		g.rectMode(CENTER);
		g.noFill();
		g.stroke(brush_hue, 100, 50, 0.15 * alpha);
		g.strokeWeight(6);
		g.rect(width / 2, height / 2, windowWidth + 6, windowHeight + 6, 4);
		g.stroke(brush_hue, 100, 50, 0.2 * alpha);
		g.strokeWeight(3);
		g.rect(width / 2, height / 2, windowWidth + 6, windowHeight + 6, 4);
		g.pop();
	}

	if (!displayBrush) return;

	g.textAlign(CENTER, CENTER);
	g.textSize(brush_size);
	if (brush_erase) {
		if (permanent) {
			g.fill(0, 0, 100, alpha);
		} else {
			g.fill(brush_hue, 70, 85, alpha);
		}
	} else {
		g.fill(brush_hue, 100, 50, alpha);
	}
	g.noStroke();

	const start = createVector(x1, y1);
	const end = createVector(x2, y2);

	const betweenPointCount = Math.min(1024, start.dist(end));
	for (let i = 0; i <= betweenPointCount; i++) {
		const {
			x,
			y
		} = start.copy().lerp(end, i / betweenPointCount);
		g.push();
		g.translate(x + width / 2, y + height / 2);
		g.rotate(brush_angle);
		g.text(brush_string, 0, 0);
		g.pop();
	}

	if (!permanent) {
		g.push();
		g.textSize(20);
		g.textAlign(RIGHT, BOTTOM);
		g.fill(0, 0, 0, alpha);
		g.stroke(0, 0, 100, alpha * 0.8);
		g.strokeWeight(4);
		g.translate(
			end.x - brush_size * 0.45 - 8 + width / 2,
			end.y - brush_size * 0.45 - 8 + height / 2);
		g.text(brush_name, 0, 0);
		g.strokeWeight(2);
		g.triangle(-6, 2, 4, -8, 8, 6);
		g.pop();
	}
}