import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements AfterViewInit {
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  
 @ViewChild('canvas', {static: false})
  private canvasRef: ElementRef;


  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;



  /* CUBE PROPERTIES */
  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public size: number = 200;




  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 400;

  @Input()
  public fieldOfView: number = 70;

  cube: any;
  sphere: any;


  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() { }



  /* STAGING, ANIMATION, AND RENDERING */

  controls: OrbitControls;

  /**
   * Create the scene
   */
  private createScene() {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    var planeGeometry = new THREE.PlaneGeometry(60,20);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x=15
    plane.position.y=0
    plane.position.z=0
    plane.receiveShadow = true;
    this.scene.add(plane);
    this.controls = new OrbitControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2; 
    

    this.addMaterialLightShadow();
    this.addCube();
    this.addSphere();
   
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    let component: CubeComponent = this;
    
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    var step=0;
    (function render() {

      step+=0.04;
      component.sphere.position.x = 20+( 10*(Math.cos(step)));
      component.sphere.position.y = 2 +( 10*Math.abs(Math.sin(step)));
      component.cube.rotation.x += 0.02;
      component.cube.rotation.y += 0.02;
      component.cube.rotation.z += 0.02;
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }());
  }
 /* EVENTS */

  /**
   * Update scene after resizing. 
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

 /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

  private addMaterialLightShadow() {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    this.scene.add( spotLight );
  }
  public addCube() {
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.cube.castShadow = true;
    this.scene.add(this.cube);
  }

  public addSphere() {
    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.position.x = +20;
    this.sphere.position.y = +4;
    this.sphere.castShadow = true;
    this.scene.add(this.sphere);
  }
}
