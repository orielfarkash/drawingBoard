function Paint(canvas,channel){
	var self=this;
	self.el={};
	self.el.canvas=canvas;
	self.el.ctx=canvas.getContext('2d');
	self.channel=channel;
	self.toclean=false;
	Paint.lineWidth=3;
	self.channel.on('value', self.copy_picture.bind(this));
	self.channel.set({});
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
	self.copy();
};

//close the drawing path
Paint.prototype.endDrawing=function(){
	var self=this;
	
	self.el.ctx.closePath();
	self.copy();
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
	
	img.onload=function(){
		self.clear();
		self.el.ctx.drawImage(img,0,0);
		self.copy();
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
	p3.clear();
	img1.onload=function(){
		p3.el.ctx.drawImage(img1,0,0);
		p3.copy();
	};
	img2.onload=function(){
		p3.el.ctx.drawImage(img2,0,0);
		p3.copy();
	};
};

//method that copy the picture to firebase databse
Paint.prototype.copy=function(){
	var self=this;
	var img=new Image;
	
	img.src=self.el.canvas.toDataURL();
	self.channel.set({img: img.src });
};

// method that copy the picture in all browsers
Paint.prototype.copy_picture=function(data){
	var self=this;
	var val=data.val();
	if (val){
		var img=new Image;
		img.src=val.img;
 		self.el.ctx.drawImage(img,0,0);	
 	}			
};

