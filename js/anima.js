/**
 * Anima (Component Based Animation Library)
 * Anima required Three js and GSAP to perform all action
 * version : v.1
 * @author : krishanu@mintreu.com
 */

class MintreuAnimate {


    constructor(param = '') {
        this.param = '';
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("rgba(0, 0, 0, 0)");
        this.maxWidth =  window.innerWidth;
        this.maxHeight = window.innerHeight;

        let mouseX;
        let mouseY;
        let myTween;
        this.animate = this.animate.bind(this);
    }

    /**
     * Set Three JS Camera (Default Perspective Camera) [step : 1]
     */
    setCamera()
    {
        this.camera = new THREE.PerspectiveCamera(30,this.maxWidth / this.maxHeight,0.1,1000);
    }

    /**
     * Set Three Js Renderer (WebGL) [step : 2]
     */
    setRenderer ()
    {
        this.renderer = new THREE.WebGLRenderer();
        this.resetRenderer();
    }

    /**
     * Optional Renderer Reset For Window Resize Time
     */
    resetRenderer()
    {
        this.renderer.setSize(this.maxWidth,this.maxHeight);
    }


    /**
     * Render Animation On Specific Div Or Entire Screen [ Step : 3 ]
     * @param divID
     */
    renderOn(divID = '')
    {
        if(divID)
        {
            this.container = document.getElementById( 'canvas' );
            document.body.appendChild( this.container );
        }
    }

    /**
     * Final Method To Star/Run/Render Current Object Animation
     */
    run()
    {
        if(this.renderer)
        {
            document.body.appendChild(this.renderer.domElement);
        }else{
            this.setRenderer();
            document.body.appendChild(this.renderer.domElement);
        }
    }

    init(divID = '')
    {
        this.setCamera();
        if(divID)
        {
            this.renderOn(divID);
        }
        this.setRenderer();
        this.run();
        // this.camera.position.z = 400;
    }


    setDistance(value = 200)
    {
        this.distance = Math.min(value,this.maxWidth / 4);
    }

    setGeometry ()
    {
        this.geometry = new THREE.Geometry();
    }

    loadVertex()
    {
        for (var i = 0; i < 1600; i++) {
            this.vertex = new THREE.Vector3();
            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);

            this.vertex.x = this.distance * Math.sin(theta) * Math.cos(phi);
            this.vertex.y = this.distance * Math.sin(theta) * Math.sin(phi);
            this.vertex.z = this.distance * Math.cos(theta);

            this.geometry.vertices.push(this.vertex);

        }
    }



    setParticle(pointSize = 2,colorValue = 0xff44ff)
    {
        this.particles = new THREE.Points(this.geometry, new THREE.PointsMaterial({color: colorValue,size: pointSize}));
    }

    attachParticleIntoSphere(value = 50)
    {
        this.particles.boundingSphere = value;
    }

    attach()
    {

    }


    rr(object)
    {
        let renderingGroup = new THREE.Group();
        renderingGroup.add(object);
        return renderingGroup;
    }




    addToScene(object)
    {
        this.scene.add(object);
    }


    zCamera(value = 400)
    {
        this.camera.position.z = value;
    }


    // EE

    animate(){
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene,this.camera);
    };












    // EVENT MAY OCCURS

    /**
     * window.addEventListner("resize",function(){...
     */
    resize_event()
    {
        this.camera.aspect = this.maxWidth / this.maxHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.maxWidth, this.maxHeight);
    }


    // onMouseMove(event){
    //     if(myTween)
    //         myTween.kill();
    //
    //     mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouseY = (event.clientY / window.innerHeight) * 2 +1;
    //     myTween = gsap.to(mintreuAnimation.particles.rotation, {duration: 0.1, x: mouseY*-1, y: mouseX});
    // };





}
