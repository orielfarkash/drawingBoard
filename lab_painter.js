function PaintBoard(){
	var self=this;
	var isdown=false;  // tells us if the mouse is down
	self.el={};
	self.el.canvas_board=document.querySelector('canvas');
	self.el.save=document.querySelector('#btn-save');
	self.el.load=document.querySelector('#btn-load');
	self.el.color_pick=document.querySelector('#color-picker');
	var ctx = self.el.canvas_board.getContext('2d');
	var canheight=self.el.canvas_board.height;
	var canwidth=self.el.canvas_board.width;
	ctx.lineWidth=3;
	
	
	// add events
	
	self.init=function(){
		
		self.el.canvas_board.addEventListener('mousedown',self.mouseIsDown);
		self.el.canvas_board.addEventListener('mousemove',self.mouseIsMoving);
		self.el.canvas_board.addEventListener('mouseup',self.stopPaint);
		self.el.save.addEventListener('click',self.save);
		self.el.load.addEventListener('click',self.load);
		
	};
	
	// when user click on the mouse
	
	self.mouseIsDown=function(e){
		
		isdown=true;
		ctx.beginPath();
		ctx.moveTo(e.offsetx,e.offsetY);
		
		
	};
	
	// when user click and drag the mouse
	
	self.mouseIsMoving=function(e){
		if(isdown){
			var color=self.el.color_pick.value;
			ctx.strokeStyle=color;
			ctx.lineTo(e.offsetX,e.offsetY);
			ctx.stroke();			
		}
		
	};
	
    // when user release the mouse
    
	self.stopPaint=function(){
		isdown=false;
		ctx.closePath();
	};
	
	//when user click on "save" button
	
	self.save=function(){
		
		var value=self.el.canvas_board.toDataURL();
	    localStorage.setItem('picture',value);
		
	};
	
	//when user click on "load" button
	
	self.load=function(){
		self.clear();
		var value=localStorage.getItem('picture');
		if (!value){return;}
		var img = new Image;
		img.src = value;
		img.onload=function(){
		ctx.drawImage(img,0,0);
		};
		
	};
	
	self.clear=function(){
		
		ctx.clearRect(0,0,canwidth,canheight);
		
	};
	
	self.init();	
};

var p1=new PaintBoard();

