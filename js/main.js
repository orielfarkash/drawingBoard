var fb = new Firebase("https://torrid-heat-4402.firebaseio.com/");
var channel1 = fb.child("drawing1");
var channel2 = fb.child("drawing2");
var channel3 = fb.child("drawing3");
var save=document.querySelector('#btn-save');
var load=document.querySelector('#btn-load');
var btn_combine=document.querySelector('.combine-paintings');
var cn=document.querySelector('canvas');
var cn2=document.querySelector('canvas:nth-child(3)');
var cn3=document.querySelector('canvas:nth-child(4)');
var p1=new Paint(cn,channel1);
var p2=new Paint(cn2,channel2);
var p3=new Paint(cn3,channel3);
var pb1=new PaintBoard(p1);
var pb2=new PaintBoard(p2);


save.addEventListener('click',pb1.saveImg.bind(pb1,'picture1'));
save.addEventListener('click',pb2.saveImg.bind(pb2,'picture2'));
load.addEventListener('click',pb1.loadImg.bind(pb1,'picture1'));
load.addEventListener('click',pb2.loadImg.bind(pb2,'picture2'));
btn_combine.addEventListener('click',pb1.combine.bind(pb1,pb2,p3));





