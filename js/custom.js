
<!--        Raw Codes-->


    var scene = new THREE.Scene();
    // scene.background = new THREE.Color(  );
    document.addEventListener( 'mousemove', onMouseMove, false );
    // set Camera   PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    // fov — Camera frustum vertical field of view.
    //     aspect — Camera frustum aspect ratio.
    //     near — Camera frustum near plane.
    //     far — Camera frustum far plane.
    // var  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

    var  camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000);


    // Specific Div
    container = document.getElementById( 'canvas' );
    document.body.appendChild( container );
    // End Specific Div
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var mouseX;
    var mouseY;

    window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

    // var distance = Math.min(200,window.innerWidth / 4);

    var distance = Math.min(250,window.innerWidth / 4);




    var geometry = new THREE.Geometry();

    for (var i = 0; i < 1600; i++) {
    var vertex = new THREE.Vector3();
    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);

    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    vertex.z = distance * Math.cos(theta);

    geometry.vertices.push(vertex);

}


    var particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff44ff,size: 2}));
    particles.boundingSphere = 50;

    // Rendering

    var renderingParent = new THREE.Group();
    renderingParent.add(particles);

    var resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    camera.position.z = 400;

    var animate = function (){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
};

    var myTween;
    function onMouseMove(event){
    if(myTween)
    myTween.kill();

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 +1;
    myTween = gsap.to(particles.rotation, {duration: 0.1, x: mouseY*-1, y: mouseX});
};

    animate();

    var animProps = {scale: 1,xRot: 0, yRot: 0};
    gsap.to(animProps, {duration: 10, scale: 1.3, repeat: -1, yoyo: true, ease: "sine", onUpdate: function(){
    renderingParent.scale.set(animProps.scale,animProps.scale,animProps.scale);
}});

    gsap.to(animProps, {duration: 120, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: "none", onUpdate: function (){
    renderingParent.rotation.set(animProps.xRot,animProps.yRot,0);
}});




<!--Raw Code End-->
