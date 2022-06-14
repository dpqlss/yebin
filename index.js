$(document).ready(function(){ 
  //메뉴를 클릭하면, 몇번째 메뉴를 클릭했는지 순번 확인, 그 순번에 해당하는 내용이 화면 상단에서 얼마 떨어져 있는지 거리를 확인해야함
  //html,body,에 스크롤양을 확인한 수치만큼 준다. - animate메서드를 이용하여 애니메이션이 되게 한다.
  
  //변수지정
  var $menu = $('.header ul li');
  var $contents =$('.con');

  //스크롤시 한 영역씩 이동
  var mHtml = $("html");
  var page = 1;

  mHtml.animate({scrollTop : 0},10);

  $(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if(page == 4) return;
        page++;
    } else if(e.originalEvent.deltaY < 0) {
        if(page == 1) return;
        page--;
    }
    var posTop =(page-1) * $(window).height();
    mHtml.animate({scrollTop : posTop});

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
})

  //메뉴 클릭 시 이동
  $menu.click(function(event){
    event.preventDefault();//기본 기능을 막는다.(html에서 #값으로 준 이동 기능 막기)
    var idx = $(this).index();//순번확인(몇번째 메뉴를 클릭했는지 순번확인해서 변수명 idx에 저장합니다.
    
    var tt = $contents.eq(idx).offset().top//내용이 화면상단에서 얼마 떨어져 있는지 거리 확인 
    console.log(tt);
    
    //해당 위치로 이동하도록
    $('html, body').animate({scrollTop:tt});//애니메이션 효과로 스크롤 부드럽게 이동

    //클릭을 할때만 활성화된 메뉴 표시하기
    //클릭한 그 요소에나 on을 추가하고 나머지 형제들은 on의 효과를 제거한다.
    //$(this).addClass('on').siblings().removeClass('on');
  });

  //스크롤 이동 반영하기(윈도우에 스크롤이 생기면 해야할 일)
  $(window).scroll(function(){
    //현재 스크롤양을 변수명 $sct에 저장한다.
    var $sct = $(this).scrollTop();

    $contents.each(function(i){
      var tg = $(this);
      if(tg.offset().top -10 < $sct) {// 현재 스크롤을 해당 컨텐츠가 화면상단에서의 거리보다 많이 내려가있다면
        $menu.removeClass('on');//on을 제거하고
        $menu.eq(i).addClass('on');
      }
    });
  });

  //갤러리 슬라이드 효과
  $('.slider-wrap').slick({
      infinite: true, //슬라이드가 무한루틴
      autoplay: false, //슬라이드 자동
      autoplaySpeed: 3000, //슬라이드 자동으로 넘어가는 시간 1000 = 1초
      speed: 500, //슬라이드 속도
      arrows: true, //화살표
      dots: true, // 점
      //slidesToShow: 1, 슬라이드가 보이는 갯수
      //slidesToScroll: 1, 슬라이드 넘어가는 갯수
    });
    //game
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 3;
    
    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    
    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }
    
    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
    
    function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
      }
    }
    function collisionDetection() {
      for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          var b = bricks[c][r];
          if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
              dy = -dy;
              b.status = 0;
              score++;
              if(score == brickRowCount*brickColumnCount) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
              }
            }
          }
        }
      }
    }
    
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
    function drawBricks() {
      for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Score: "+score, 8, 20);
    }
    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }
    
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
    
      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if(y + dy < ballRadius) {
        dy = -dy;
      }
      else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        }
        else {
          lives--;
          if(!lives) {
            alert("GAME OVER");
            document.location.reload();
          }
          else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width-paddleWidth)/2;
          }
        }
      }
    
      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
      }
      else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
    
      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }
    
    draw();
});
