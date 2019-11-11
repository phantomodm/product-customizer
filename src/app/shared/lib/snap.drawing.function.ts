import "snapsvg-cjs";
declare var Snap:any;
declare var mina:any;

export function Drawing(svgString, transformString, timeBetweenDraws, locationTString, svgCanvas,svgClone?) {
    this.fragment = Snap.parse(svgString);
    this.pathArray = this.fragment.selectAll('path');
    this.group = svgCanvas.g().transform(locationTString + transformString).drag();
    //this.groupClone = svgClone.g().transform(locationTString + transformString).drag();
    this.timeBetweenDraws = timeBetweenDraws;
};
Drawing.prototype.init = function (svgString, transformString) {
    //this.groupClone.clear();
    this.group.clear();
    this.currentPathIndex = 0;
};
Drawing.prototype.endReached = function () {
    if (this.currentPathIndex >= this.pathArray.length) {
        return true;
    };
};
Drawing.prototype.callOnStart = function () {
}
Drawing.prototype.callOnFinished = function () {
}
Drawing.prototype.initDraw = function () {
    this.init();
    this.draw();
};
Drawing.prototype.quickDraw = function () {
    this.init();
    this.timeBetweenDraws = 0;
    this.draw();
};
Drawing.prototype.draw = function () { // this is the main animation bit
    if (this.endReached()) {
        if (this.callOnFinished) {
            this.callOnFinished();
            return
        };
    };
    var myPath = this.pathArray[this.currentPathIndex];
    this.leng = myPath.getTotalLength();
    this.group.append(myPath);
    //this.groupClone.append(myPath);

    myPath.attr({
        fill: 'none',
        id:'check_mark',
        class:'confirmation-check',       
        "stroke-dasharray": this.leng + " " + this.leng,
        "stroke-dashoffset": this.leng
    });
    this.currentPathIndex++;
    myPath.animate({ "stroke-dashoffset": 0 }, this.timeBetweenDraws, mina.easeout, this.draw.bind(this))
};