/*
 Exercicio 4.4
 Entity.js
*/
var Entity = Class.extend(function(){
  this.sprite={sourceX:0,
			   sourceY:0,
               sourceWidth:40,
               sourceHeight:70
			  };
   
  this.x=0;
  this.y=0;
  this.width= 40;
  this.height= 70;
  this.alpha=1;
  this.shadow={	active:false,
				shadowColor:"rgba(100, 100, 100, 0.5)",
				shadowOffsetX: 3,
				shadowOffsetY: 3,
				shadowBlur:3
			  };
  this.rotation=0;
  this.visible=true;
  
  this.vx=3;
  this.vy=3;
 
  this.constructor= function(){};
  
  this.update=function(){};
  
  this.scale= function(scale){
	this.height += scale;  
    this.width += scale;  
    this.x -= scale/2;  
    this.y -= scale/2;   
  }
  
  this.scaleX= function(scale){
    this.width += scale;  
    this.x -= scale/2;  
    
  }
  
  this.scaleY= function(scale){
	this.height += scale;  
    this.y -= scale/2;   
  }
  
  this.getLeftCoord		= function (){return this.x;}
  this.getRightCoord	= function (){return this.x + this.width;}
  this.getTopCoord		= function (){return this.y;}
  this.getBottomCoord	= function (){return this.y+ this.height;}

  
});


