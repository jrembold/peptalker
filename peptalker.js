// Global components
let myfont;
let frame1;
let frame2;
let frame3;
let frame4;
let title;
let backgroundColor;
let framewidth;
let button;
let mytext;


// Global Colors
let col1 = "#F8FFE5";
let col2 = "#06D6A0";
let col3 = "#1B9AAA";
let col4 = "#EF476F";
let col5 = "#FFC43D";


// Global Data
let f1 = [
	"Champ,", "Fact:", "Everybody says", "Dang...", "Just saying...", "Superstar,", "Tiger,", "Self,",
	"Know this:", "News alert:", "Girl,", "Ace,", "Excuse me but", "Experts agree:", "In my opinion,",
	"Hear ye, hear ye:", "Okay, listen up:"
];
let f2 = [
	"the mere idea of you", "your soul", "your hair today", "everything you do", "your personal style",
	"every thought you have", "that sparkle in your eye", "your presence here", "what you got going on",
	"the essential you", "your life's journey", "that saucy personality", "your DNA", "that brain of yours",
	"your choice of attire", "the way you roll", "whatever your secret is", "all of y'all"
];
let f3 = [
	"has serious game,", "rains magic,", "deserves the Nobel Prize,", "raises the roof,", "breeds miracles,",
	"is paying off big time,", "shows mad skills,", "just shimmers,", "is a national treasure,",
	"gets the party hopping,", "is the next big thing,", "roars like a lion,", "is a rainbow factory,",
	"is made of diamonds,", "makes birds sing,", "should be taught in school,", "makes my world go 'round,",
	"is 100% legit,"
];
let f4 = [
	"24/7.", "can I get an amen?", "and that's a fact.", "so treat yourself.", "you feel me?", "that's just science.",
	"would I lie?", "for reals.", "mic drop.", "you hidden gem.", "snuggle bear.", "period.", "can I get an amen?",
	"now let's dance.", "high five.", "say it again!", "according to CNN.", "so get used to it."
];

class Frame {
	// Controls the content and animation of one spinning wheel
	constructor(x,y,contents, fcolor=col2) {
		this.x = x;
		this.y = y;
		this.contents = contents;
		this.contents_index = 0; //used to cycle through
		this.content_color = color(fcolor);
		this.width = framewidth;
		this.textsize = framewidth/9;
		this.height=5*this.textsize;
		this.pos = this.height / 2;
		this.speed = 0;
		this.minspeed = this.height*0.01; 
		this.spinning = false;
		this.decay = 0.025; // how fast the speed decays
	};

	draw() {
		// Drawing the actual text
		push();
		fill(this.content_color);
		textAlign(CENTER, CENTER);
		textFont(myfont);
		textSize(this.textsize);
		text(this.contents[this.contents_index], 
		 	 this.x, 
			 this.y + this.pos - this.height/4, 
			 this.width, 
			 );
		pop();

		// Top and bottom boxes to clip the text as it moves behind
		push();
		fill(backgroundColor);
		//stroke(255,255,255);
		noStroke();
		rect(this.x, this.y-this.height, this.width, this.height);
		rect(this.x, this.y + this.height, this.width, this.height);
		pop();

		// Controlling the animation
		if (this.spinning) {
			this.pos += this.speed
			if (this.pos > this.height*6/5) { //if off bottom, back to top with new text
				this.pos -= this.height;
				this.contents_index = (this.contents_index+1) % this.contents.length;
			};
			// Slow the spinning until slow and back and starting point
			this.speed = max(this.speed-this.decay, this.minspeed);
			if (this.speed == this.minspeed & abs(this.height/2 - this.pos) <= 4 ) {
				this.spinning = 0;
				this.speed = 0;
				this.pos = this.height / 2;
			};
		};
	};

	update (newX, newY) {
		// Update method for if screen dimensions change
		this.x = newX;
		this.y = newY;
		this.width = framewidth;
		this.textsize = framewidth/9;
		this.height=5*this.textsize;
		this.pos = this.height / 2;
		this.speed = 0;
		this.minspeed = this.height*0.01;
		this.spinning = false;
		this.decay = 0.025;
	};

	spin(speed) {
		// Set the wheel a spinning with given speed
		this.spinning = true;
		this.speed = speed;
	};
};

function preload() {
	// Preloads my custom font
	myfont = loadFont('TitanOne-Regular.ttf');
};

function setup () {
	// Create the canvas and basic constants
	createCanvas(windowWidth, windowHeight-4);
	backgroundColor = color(col1);
	framewidth = (windowWidth-200)/4;
	let frameheight = framewidth * 5/9;
	let frameyloc = (windowHeight-4)/2-frameheight/2;
	// Give all the data an initial shuffle to randomize
	shuffleArray(f1);
	shuffleArray(f2);
	shuffleArray(f3);
	shuffleArray(f4);
	// Create the frames and title
	frame1 = new Frame(100,frameyloc,f1, col2);
	frame2 = new Frame(100+framewidth,frameyloc,f2, col3);
	frame3 = new Frame(100+2*framewidth,frameyloc,f3, col4);
	frame4 = new Frame(100+3*framewidth,frameyloc,f4, col5);
	title = new Title();
	// Draw an initial title to instantiate needed values for DOM elements below
	title.draw();


	// Create the link for attribution of the source material
	let src = createA('https://www.reddit.com/r/coolguides/comments/qacund/handy_pep_talk_guide/', "here","_blank");
	src.style("font-family", 'TitanOne-Regular');
	src.style("font-size", title.titletextsize/4+"px");
	src.position(...title.linkloc);

	// Add a button to respin the wheels. Space key also works
	button = createButton("Another!");
	button.position(windowWidth/2-200, windowHeight-150);
	button.class("spintime");
	button.mousePressed(spin);
};

function draw () {
	// Clear the screen and draw all items in necessary positions
	background(backgroundColor);
	frame1.draw();
	frame2.draw();
	frame3.draw();
	frame4.draw();
	title.draw();


};

function spin () {
	// Set all 4 wheels spinning after a short delay
	frame1.spin(15);
	setTimeout(() => {frame2.spin(17)}, 250);
	setTimeout(() => {frame3.spin(19)}, 500);
	setTimeout(() => {frame4.spin(21)}, 750);
	// Rerandomizes the data just to ensure a certain
	// animation speed doesn't lock you into only a few options
	setTimeout(() => {
		shuffleArray(f1);
		shuffleArray(f2);
		shuffleArray(f3);
		shuffleArray(f4);
	}, 750);
};

function shuffleArray(array) {
	// No built in shuffler in JS? So I found this one online
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function keyPressed() {
	// Pressing space will set the wheels spinning
	if (keyCode == 32) {
		spin();
	};
};

function deviceShaken() {
	// Shaking a mobile device will set the wheels spinning
	spin();
};

function windowResized() {
	// If the window is resized, we need to resize the canvas and
	// then adjust all the spacings of all contents to ensure when
	// they are next redrawn they are in the correct positions and 
	// sizes.
	resizeCanvas(windowWidth, windowHeight-4);
	framewidth = (windowWidth-200)/4;
	let frameheight = framewidth * 5/9;
	let frameyloc = (windowHeight-4)/2-frameheight/2;

	frame1.update(100,frameyloc);
	frame2.update(100+1*framewidth,frameyloc);
	frame3.update(100+2*framewidth,frameyloc);
	frame4.update(100+3*framewidth,frameyloc);

	button.position(windowWidth/2-200, windowHeight-150);

	// TODO: Not currently updating title sizes
};

class Title {
	// Draws the title and accompanying attribution, as well as
	// controlling color animation
	constructor () {
		this.textsize = windowWidth / 20;
		this.fillcolor = color(50,50,50);
		this.edgecolor = color(col2);
		this.text = "Pep Talker";
		this.titlewidth = textWidth(this.text);
		this.counter = 0; // for animation
		// These attributes are just for easy positioning of the anchor DOM element
		this.herewidth = 0;
		this.spacewidth = 0;
		
		this.draw();
	};

	draw() {
		// Draw the main title
		push();
		textAlign(LEFT,TOP);
		textFont(myfont);
		textSize(this.textsize);
		fill(this.fillcolor);
		stroke(this.edgecolor);
		strokeWeight(8);
		this.titlewidth = textWidth(this.text);
		text(this.text, 50, 50);
		pop();


		// Draw the attribute portion
		push();
		textAlign(RIGHT,TOP);
		textFont(myfont);
		textSize(this.textsize/4);
		fill(50,50,50);
		this.herewidth = textWidth(" here");
		this.spacewidth = textWidth(" ");
		text("Content from", 50+this.titlewidth - this.herewidth, 50+1.1*this.textsize);
		pop();

		// Update the edge colors for nice animated effect
		this.updateEdgeColor();
	};

	get linkloc() {
		// Gets the x and y position of where the anchor DOM should be placed
		return [50 + this.titlewidth - this.herewidth + this.spacewidth, 50 + 1.1*this.textsize];
	};

	get titletextsize() {
		// Gets the current main title size. Attribution is 1/4 this size.
		return this.textsize;
	};

	updateEdgeColor() {
		// Updates through the colors and interpolates between each pair
		this.counter += 1;
		if (this.counter < 100) {
			this.edgecolor = lerpColor(color(col2), color(col3), this.counter%100/100);
		} else if (this.counter < 200) {
			this.edgecolor = lerpColor(color(col3), color(col4), this.counter%100/100);
		} else if (this.counter < 300) {
			this.edgecolor = lerpColor(color(col4), color(col5), this.counter%100/100);
		} else if (this.counter < 400) {
			this.edgecolor = lerpColor(color(col5), color(col2), this.counter%100/100);
		} else {
			this.counter = 0;
		};
	};
};

