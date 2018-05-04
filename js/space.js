/*
 * https://ptsjs.org/
 * https://github.com/williamngan/pt/
 ************************************ */

(function(){
  // Add Pts into scope if needed
  Pts.namespace( this );
  // Create space and form
  var space = new CanvasSpace(".canvas").setup({ bgcolor: "transparent", retina: false, resize: true });
  var form = space.getForm();
  var pts = farPts = undefined;
  var colors = [
    "#58D3F7", "#F7FE2E", "#F3F781"
  ];

  space.add((time, ftime) => {
    // make 150 points for the inner space
    if (!pts) pts = Create.distributeRandom( space.innerBound , 150 );
    if (!farPts) farPts = Create.distributeRandom( space.innerBound, 100 );

    // pointer
    let t = space.pointer;
    // sort the pts
    pts.sort( (a,b) =>
      a.$subtract(t).magnitudeSq() - b.$subtract(t).magnitudeSq()
    );

    // rotate all points
    pts.rotate2D( -Const.one_degree / 60, space.size.$divide(1.9));

    // apply color to all points
    form.fillOnly( "#ffe" ).points( pts, 0.8, "circle" );
    form.fillOnly( "#ffa" ).points( farPts, 0.7, "circle" );

    // select the closest 10% of the points
    let selected = pts.slice(0, 5);
    selected.forEach((p, i) => {
      form.fillOnly( colors[ i%3 ], 1);
      form.point(p, 4 - 4*i/selected.length, "circle");
    });
  });
  // start
  space.play().bindMouse().bindTouch();
})();
