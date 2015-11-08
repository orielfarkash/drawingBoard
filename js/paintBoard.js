function PaintBoard(paint){ 
	var self=this;
	self.el={};
	self.el.paint=paint;
	self.el.canvas_board=paint.el.canvas;
	self.isdown=false;
	self.el.color_pick=document.querySelector('#color-picker');
	self.el.canvas_board.addEventListener('mousedown',self.mouseIsDown.bind(this));
	self.el.canvas_board.addEventListener('mousemove',self.mouseIsMoving.bind(this));
	self.el.canvas_board.addEventListener('mouseup',self.stopPaint.bind(this));
}
// when user click on the mouse	
PaintBoard.prototype.mouseIsDown=function(e){
	var self=this;
	self.isdown=true;
	var location={};
	location.x=e.offsetX;
	location.y=e.offsetY;
		
	self.el.paint.movePainter(location);	
};
	
// when user click and drag the mouse
PaintBoard.prototype.mouseIsMoving=function(e){
	var self=this;
	if(self.isdown){
		var color=self.el.color_pick.value;
		var to_where={};
		to_where.x=e.offsetX;
		to_where.y=e.offsetY;
			
		self.el.paint.drawing(to_where,color);		
		}
};
	
// when user release the mouse
PaintBoard.prototype.stopPaint=function(){
	var self=this;
	self.isdown=false;
		
	self.el.paint.endDrawing();
};
	
//when user click on "save" button
PaintBoard.prototype.saveImg=function(savingName){
	var self=this;
	
	self.el.paint.save(savingName);	
};
	
//when user click on "load" button
PaintBoard.prototype.loadImg=function(loadingName){
	var self=this;
		
	self.el.paint.load(loadingName);		
};

// when user click the combine button 
PaintBoard.prototype.combine=function(pbd2,p3){
	var self=this;
	
	self.el.paint.combinePics(pb2.el.paint,p3);
};
