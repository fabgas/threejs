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
    this.camera.position.set( 500, 800, 1300 );
    this.camera.lookAt( 0, 0, 0 );
   
    var gridHelper = new THREE.GridHelper( 2000, 20 );
		this.scene.add( gridHelper );
    this.camera.position.z = this.cameraZ;
    this.controls = new OrbitControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
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
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
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
}
