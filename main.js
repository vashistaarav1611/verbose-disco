var {
	nosex,
	nosey,
	minus,
	lwx,
	rwx
} = 0;

function setup() {
	canvas = createCanvas(700, 500)
	canvas.position(700, 150);
	video = createCapture(VIDEO)
	poseNet = ml5.poseNet(video, modelloaded)
	poseNet.on("pose", gotpose)
}

function modelloaded() {
	console.info("fired!")
}

function gotpose(results, err) {
	if (results.length > 0) {
		console.log(`nose-x ${nosex} nose-y ${nosey}`)
		nosex = results[0].pose.nose.x;
		nosey = results[0].pose.nose.y;
		lwx = floor(results[0].pose.leftWrist.x);
		rwx = floor(results[0].pose.rightWrist.x);
		minus = lwx - rwx;
	}
}

function draw() {
	background(220);
	c = color(random(255), random(255), random(255));
	fill(c);
	square(nosex, nosey, minus);
	document.getElementById("hw2").innerHTML = `${minus}px`;
}
