/**
* William Chislett 2014
 */

define(function(require, exports, module) {
    var Engine  = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var GridLayout = require("famous/views/GridLayout");
    var StateModifier = require('famous/modifiers/StateModifier');
    var Flipper    = require("famous/views/Flipper");
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var RenderNode = require('famous/core/RenderNode');
    var Modifier = require('famous/core/Modifier');

    var mainContext = Engine.createContext();
    
    mainContext.setPerspective(500);
    
    var size = {};
    size[0] = window.innerWidth;
    size[1] = window.innerHeight;
    
    var surfaceExperiments = new Surface({
        size: [undefined, undefined],
        content: "Experiments",
        classes: ["orange"],
        properties: {
            lineHeight: size[1]/2 + "px",
            textAlign: "center"
        }
    });
    
     var surfaceExperimentsBack = new Surface({
        size: [undefined, undefined],
        content: "Experiments content goes here",
        classes: ["grey"],
        properties: {
            lineHeight: size[1]/2 + "px",
            textAlign: "center"
        }
    });
    
    var surfaceCV = new Surface({
        size: [undefined, undefined],
        content: "CV",
        classes: ["dark-green"],
        properties: {
            lineHeight: size[1]/2 + "px",
            textAlign: "center"
        }
    });
    
    var surfaceContact = new Surface({
        size: [undefined, undefined],
        content: "Contact",
        classes: ["peach"],
        properties: {
            lineHeight: size[1]/2 + "px",
            textAlign: "center"
        }
    });
    
    var surfaceAbout = new Surface({
        size: [undefined, undefined],
        content: "About",
        classes: ["grey"],
        properties: {
            lineHeight: size[1]/2 + "px",
            textAlign: "center"
        }
    });
    
    var flipper = new Flipper();
    flipper.setFront(surfaceExperiments);
    flipper.setBack(surfaceExperimentsBack);
    
    
    var cvStateModifier = new StateModifier({
      // sets initial x- and y-scale to be 0
      transform: Transform.scale(1, 1, 1),
      size: [size[0]/2, size[1]/2],
      origin: [1,0]
  });
  
  var experimentsStateModifier = new StateModifier({
      // sets initial x- and y-scale to be 0
      transform: Transform.scale(1, 1, 1),
      size: [size[0]/2, size[1]/2],
      origin: [0,0]
  });
   
    var allPanelsView = new RenderNode();
    
    // Modifiers allow continuous transforms with high perf.  They do all
    // the same things as StateModifiers, but those duplicate methods like 
    // size/origin are deprecated and you should use StateModifier instead
    // for them.
    var spinnerModifier = new Modifier({
        
    }); 
    
    
    allPanelsView.add(spinnerModifier).add(cvStateModifier).add(surfaceCV);
    allPanelsView.add(experimentsStateModifier).add(flipper);
    
    mainContext.add(allPanelsView);
    
    spinnerModifier.transformFrom(rotate);
    
    var angle = 0;
    function rotate() {
      angle += 0.01;
    return Transform.rotateZ(angle);
  }
    
    var toggle = false;
    Engine.on('click', function(){
        var angle = toggle ? 0 : Math.PI;
        flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
        toggle = !toggle;
    });
});
  
