var GameWorld = Class.extend(function () {
    this.constructor = function (x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;

        // Sprite object to hold the Background's sprite information
        this.sprite = {
            sourceX: 0,
            sourceY: 0,
            sourceWidth: width || 1980, // Default width
            sourceHeight: height || 1080, // Default height
            img: '',
            src: 'assets/Backgrounds/quarto_background.png' // Default image source,
        };
    }
});