/*
 * https://ptsjs.org/
 * https://github.com/williamngan/pt/
 ************************************ */

(function(){
  // Add Pts into scope if needed
  Pts.namespace( this );
  // Create space and form
  var space = new CanvasSpace(".canvas").setup({ bgcolor: "#252934", retina: true, resize: true });
  var form = space.getForm();
  var ptsOut, ptsIn = undefined;
  var colors = [
    "#CEECF5", "#FA8258", "#F3F781"
  ];

  space.add((time, ftime) => {
    // make 300 pts for the outer space
    if (!ptsOut) ptsOut = Create.distributeRandom( space.outerBound, 200 );
    // make 200 points for the inner space
    if (!ptsIn) ptsIn = Create.distributeRandom( space.innerBound, 400);

    // pointer
    let t = space.pointer;
    // concat all points in one array
    var combined = ptsOut.concat(ptsIn);
    // sort the pts
    combined.sort( (a,b) =>
      a.$subtract(t).magnitudeSq() - b.$subtract(t).magnitudeSq()
    );

    // rotate all points
    ptsOut.rotate2D( Const.one_degree / 500, space.size.$divide(2));
    ptsIn.rotate2D( -Const.one_degree / 20, space.size.$divide(2));

    // apply color to all points
    form.fillOnly( "#999" ).points( ptsOut, 0.5, "circle" );
    form.fillOnly( "#ffc" ).points( ptsIn, 0.8, "circle" );

    // select the closest 10% of the points
    let selected = combined.slice(0, combined.length/10);
    selected.forEach((p, i) => {
      form.fillOnly( colors[ i%3 ], 1);
      form.point(p, 4 - 4*i/selected.length, "circle");
    });
  });
  // start
  space.play().bindMouse().bindTouch();
})();
