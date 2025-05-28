var Background = Entity.extend(function () {
    
  this.constructor = function(){
   this.super(1920, 1080, 1920, 1080, "", "assets/backgrounds/City3.png");  

    this.sprite.sourceX=0;
    this.sprite.sourceY=0;
    this.sprite.sourceWidth=1920;
    this.sprite.sourceHeight=1080;
    this.sprite.img = new Image(this.sprite.sourceWidth, this.sprite.sourceHeight);
    this.sprite.img.src = this.sprite.src;

  };
})