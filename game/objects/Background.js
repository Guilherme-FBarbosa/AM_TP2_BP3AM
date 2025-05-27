var Background = Entity.extend(function () {
    
  this.constructor = function(){
   this.super();  

    this.sprite.img="";
    this.sprite.imgURL="assets/backgrounds/City3.png";
    this.sprite.sourceX=0;
    this.sprite.sourceY=0;
    this.sprite.sourceWidth=1920;
    this.sprite.sourceHeight=1080;
  };
})