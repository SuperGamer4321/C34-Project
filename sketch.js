const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,tube,ground;
var tube_con;
var tube_con_2;
var tube_con_3;
var rope3;

var bg_img;
var food;
var scientistImg,blower;
var star1,star2,emptyStars,oneStar,twoStar,displayStars;
var starImg,starCount = 0, isTouchedStar1 = false , isTouchedStar2 = false;

var button,button2,button3;
var scientist,thanks,oh_no;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.jpg');
  food = loadImage('tube.png');
  scientistImg = loadImage('scientist.png');
  starImg = loadImage("star.png");
  emptyStars = loadImage("empty.png");
  oneStar = loadImage("one_star.png");
  twoStar = loadImage("stars.png");
  
  bk_song = loadSound('sound1.mp3');
  cut_sound = loadSound('rope_cut.mp3');
  air = loadSound('air.wav');
  oh_no = loadSound('oh_no.mp3')
  thanks = loadSound('thanks.mp3')
}

function setup() 
{
  createCanvas(1500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(580,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(980,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:580,y:90});
   rope2 = new Rope(7,{x:1010,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blower = createImg("baloon2.png");
  blower.position(800,370);
  blower.size(120,120);
  blower.mouseClicked(function(){
    Matter.Body.applyForce(tube,{ x : 0 , y : 0 },{ x : 0.01 , y : -0.05 })
  });
  
  ground = new Ground(300,height,width,20);

  scientist = createSprite(700,580,100,100);
  scientist.scale = 0.29;
  scientist.addImage("scientist",scientistImg);

  star1 = createSprite(850,50);
  star1.addImage("star1",starImg);
  star1.scale = 0.02;

  star2 = createSprite(600,350);
  star2.addImage("star2",starImg);
  star2.scale = 0.02;

  displayStars = createSprite(100,50);
  displayStars.addImage("empty",emptyStars);
  displayStars.addImage("one",oneStar);
  displayStars.addImage("two",twoStar);
  displayStars.scale = 0.2;

  tube = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,tube);

  tube_con = new Link(rope,tube);
  tube_con_2 = new Link(rope2,tube);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(tube!=null){
    image(food,tube.position.x,tube.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(tube,scientist,80)==true)
  {
    World.remove(engine.world,tube);
    bk_song.stop();
    thanks.play();
    tube = null;

  }

  if(collide(tube,star1,20)===true && !isTouchedStar1){
    star1.visible = false ;
    //displayStars.changeImage
    isTouchedStar1 = true
    starCount++;
  }

  if(collide(tube,star2,20)===true && !isTouchedStar2){
    star2.visible = false ;
    isTouchedStar2 = true;
    starCount++;
  }

  console.log(starCount);

  if(starCount === 1){
    displayStars.changeImage("one");
  }

  if(starCount === 2){
    displayStars.changeImage("two");
  }

  if(tube!=null && tube.position.y>=650)
  {
    bk_song.stop();
    oh_no.play();
    tube=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  tube_con.dettach();
  tube_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  tube_con_2.dettach();
  tube_con_2 = null;
}

function collide(body,sprite,distance)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=distance)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function blow (){

}