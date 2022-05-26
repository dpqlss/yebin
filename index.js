//경고창 띄우기
//alert("경고")

$(document).ready(function(){ 
  //메뉴를 클릭하면, 몇번째 메뉴를 클릭했는지 순번 확인, 그 순번에 해당하는 내용이 화면 상단에서 얼마 떨어져 있는지 거리를 확인해야함
  //html,body,에 스크롤양을 확인한 수치만큼 준다. - animate메서드를 이용하여 애니메이션이 되게 한다.
  
  //변수지정
  var $menu = $('.header ul li');
  var $contents =$('.con');

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
      arrows: false, //화살표
      dots: false, // 점
      slidesToShow: 1, //슬라이드가 보이는 갯수
      slidesToScroll: 1 //슬라이드 넘어가는 갯수
   });
});
