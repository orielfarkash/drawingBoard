function Paint(canvas){
	var self=this;
	self.el={};
	self.el.canvas=canvas;
	self.el.ctx=canvas.getContext('2d');
	Paint.lineWidth=3;
}

//moving the painter to the start position,from where the user want to paint
Paint.prototype.movePainter=function(from){
	var self=this;
	
	self.el.ctx.beginPath();
	self.el.ctx.moveTo(from.x,from.y);	
};

//draw the line
Paint.prototype.drawing=function(to_where,color){
	var self=this;
	var ctx=self.el.ctx;
	
	ctx.lineWidth=Paint.lineWidth;
	ctx.strokeStyle=color;
	ctx.lineTo(to_where.x,to_where.y);
	ctx.stroke();
};

//close the drawing path
Paint.prototype.endDrawing=function(){
	var self=this;
	
	self.el.ctx.closePath();
};

//save the picture in local storage
Paint.prototype.save=function(savingName){
	var self=this;
	var value=self.el.canvas.toDataURL();
	
	localStorage.setItem(savingName,value);
};

// load the last saved picture from the local storage
Paint.prototype.load=function(loadingName){
	var self=this;
	var value=localStorage.getItem(loadingName);
	if (!value){return;}
	var img = new Image;
	img.src = value;
	
	self.clear();
	img.onload=function(){
		self.el.ctx.drawImage(img,0,0);
		};	
};

// clear the canvas
Paint.prototype.clear=function(){
	var self=this;

	self.el.ctx.clearRect(0,0,self.el.canvas.width,self.el.canvas.height);
};

//combine canvas1 img and canvas2 img into this canvas
Paint.prototype.combinePics=function(p2,p3){
	var self=this;
	var img1=new Image;
	var img2=new Image;
	
	img1.src=self.el.canvas.toDataURL();
	img2.src=p2.el.canvas.toDataURL();
	p3.el.ctx.drawImage(img1,0,0);
	p3.el.ctx.drawImage(img2,0,0);
};
