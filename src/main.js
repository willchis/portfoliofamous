
define(function(require, exports, module) {
  var Engine            = require('famous/core/Engine');
  var Surface           = require('famous/core/Surface');

  var StateModifier     = require('famous/modifiers/StateModifier');
  var SnapTransition    = require('famous/transitions/SnapTransition');
  var Transform        = require("famous/core/Transform");
  var Easing           = require("famous/transitions/Easing");
  var Modifier = require('famous/core/Modifier');
  
  
  var context = Engine.createContext();
  
  var surface = new Surface({
    size: [200,200],
    classes: ['start-box'],
    properties: {
      backgroundColor: 'black'
    }
  });
  
  var cv = new Surface({
    size: [10,10],
    classes: ['cv', 'menu'],
    properties: {
      backgroundColor: 'black'
    }
  });
  var cvHolder = new Surface({
    size: [10,10],
    classes: ['holder'],
    properties: {
      content: 'CV',
      backgroundColor: 'yellow'
    }
  });
  
  var about = new Surface({
    size: [10,10],
    classes: ['about', 'menu'],
    properties: {
      backgroundColor: 'black'
    }
  });
  var aboutHolder = new Surface({
    size: [10,10],
    classes: ['holder'],
    properties: {
      content: 'About'
    }
  });
  
  var contact = new Surface({
    size: [10,10],
    classes: ['contact', 'menu'],
    properties: {
      backgroundColor: 'black'
    }
  });
  var contactHolder = new Surface({
    size: [10,10],
    classes: ['holder'],
    properties: {
      content: 'Contact'
    }
  });
  
  
  var experiments = new Surface({
    size: [10,10],
    classes: ['experiments', 'menu'],
    properties: {
      backgroundColor: 'black'
    }
  });
  var experimentsHolder = new Surface({
    size: [10,10],
    classes: ['holder'],
    properties: {
      content: 'Experiments'
    }
  });
  
  var cvModifier = new Modifier({origin:[.5,.5]});
  var aboutModifier = new Modifier({origin:[.5,.5]});
  var contactModifier = new Modifier({origin:[.5,.5]});
  var experimentsModifier = new Modifier({origin:[.5,.5]});
  
  
  // Modifiers allow continuous transforms with high perf.  They do all
    // the same things as StateModifiers, but those duplicate methods like 
    // size/origin are deprecated and you should use StateModifier instead
    // for them.
  var shrinkModifier = new Modifier({
    origin: [.5,.5],
  });
  
  
  
   var angle = 0;
  
    function rotate() {
      angle += 0.01;
    return Transform.rotateZ(angle);
    };
    
    var angle2 = 0;
    function rotate2() {
      angle2 += 0.01;
    return Transform.rotateZ(angle2);
    };
    
  shrinkModifier.transformFrom(rotate);
  
   // Spin the small squares
    var cvSpinModifier = new Modifier({});
    var aboutSpinModifier = new Modifier({});
    var experimentsSpinModifier = new Modifier({});
    var contactSpinModifier = new Modifier({});
  
        
  surface.on('click', function() {
    
    shrinkModifier.halt();//transformFrom(null);
    Transform.rotateZ(angle);
    shrinkModifier.setTransform(
      Transform.scale(0.1, 0.1, 1), 
      { curve: 'easeInOut', duration: 1000}
    , function() {
     // callback
     
    // Start spinning
     cvSpinModifier.transformFrom(rotate2);
     aboutSpinModifier.transformFrom(rotate2);
     experimentsSpinModifier.transformFrom(rotate2);
     contactSpinModifier.transformFrom(rotate2);
     
     cvModifier.setTransform(
        Transform.translate(window.innerWidth / 4, window.innerHeight / 4),
        {curve: 'easeInOut', duration: 500}
      );
      
      // explode them out
      aboutModifier.setTransform(
        Transform.translate(-window.innerWidth / 4, window.innerHeight / 4),
        {curve: 'easeInOut', duration: 500}
      );
      
      experimentsModifier.setTransform(
        Transform.translate(window.innerWidth / 4, -window.innerHeight / 4),
        {curve: 'easeInOut', duration: 500}
      );
      
      contactModifier.setTransform(
        Transform.translate(-window.innerWidth / 4, -window.innerHeight / 4),
        {curve: 'easeInOut', duration: 500}
      )
      
      
      
    })
  });
    
  context.add(shrinkModifier).add(surface);
  context.add(cvModifier).add(cvHolder).add(cv);
  //context.add(aboutModifier).add(aboutModifier).add(aboutSpinModifier).add(about);
  //context.add(contactModifier).add(contactHolder).add(contactSpinModifier).add(contact);
  //context.add(experimentsModifier).add(experimentsHolder).add(experimentsSpinModifier).add(experiments);
});