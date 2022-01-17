// header typing effect
String.prototype.toKorChars = function() {
  var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
    cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
    cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cho, jung, jong;
  var str = this,
    cnt = str.length,
    chars = [],
    cCode;
  for (var i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);
    if (cCode == 32) {
      chars.push(" ");
      continue;
    } // 한글이 아닌 경우
    if (cCode < 0xAC00 || cCode > 0xD7A3) {
      chars.push(str.charAt(i)); continue;
    }
    cCode = str.charCodeAt(i) - 0xAC00;

    jong = cCode % 28;
    // 종성
    jung = ((cCode - jong) / 28 ) % 21

    // 중성
    cho = (((cCode - jong) / 28 ) - jung ) / 21
    // 초성

    //기본 코드 테스트가 ㅌㅔㅅ-ㅌ- 형식으로 저장됨
    // chars.push(cCho[cho], cJung[jung]);
    // if (cJong[jong] !== '') {
    //     chars.push(cJong[jong]);
    //     }

    // 이부분을 원하는 방향으로 바꿈.
    // 테스트라는 문장이
    // ㅌ,ㅔ,ㅅ,-,ㅌ,- 형식으로 저장되던 코드를
    // ㅌ,테,ㅅ,스,ㅌ,트 형식으로 저장되도록함 (타이핑효과를 위해서)
    chars.push(cCho[cho]);
    chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
    if (cJong[jong] !== '') {
      chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
    }

  }

  return chars;
}


//타이핑할 문장
var typingHeader  = "KAIST 대학원 총학생회 연구환경실태조사 결과 보고서";
var typeing1=[];
typingHeader = typingHeader.split(''); // 한글자씩자름

//각글자 초성,중성,종성으로 나눠서 배열로 저장함.
for(var i =0; i<typingHeader.length; i++){
  typeing1[i]=typingHeader[i].toKorChars();
}

//출력할 엘리먼트요소 가져옴 -result클래스에 출력
var resultDiv = document.getElementsByClassName("typing")[0];


var text = "";
var i=0;
var j=0;
var text = '';

//총글자수
var imax = typeing1.length;

//setInterval을 이용해 반복적으로 출력
var inter = setInterval(typi,150);


function typi(){
  //글자수만큼 반복후 종료
  if(i<=imax-1){
    //각 글자가 초성 중성 종성 순서대로 추가되도록
    var jmax = typeing1[i].length;
    resultDiv.innerHTML = text + typeing1[i][j];
    j++;
    if(j==jmax){
      text+=  typeing1[i][j-1];
      //초성중성종성 순서대로 출력된 후 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )

      i++;
      j=0;
    }
  } else{
    clearInterval(inter);
  }
}

// side nav bar progress
var toc = document.querySelector( '.toc' );
var tocPath = document.querySelector( '.toc-marker path' );
var tocItems;

// Factor of screen size that the element must cross
// before it's considered visible
var TOP_MARGIN = 0.1,
  BOTTOM_MARGIN = 0.2;

var pathLength;

var lastPathStart,
  lastPathEnd;

window.addEventListener( 'resize', drawPath, false );
window.addEventListener( 'scroll', sync, false );

drawPath();

function drawPath() {

  tocItems = [].slice.call( toc.querySelectorAll( 'li' ) );

  // Cache element references and measurements
  tocItems = tocItems.map( function( item ) {
    var anchor = item.querySelector( 'a' );
    var target = document.getElementById( anchor.getAttribute( 'href' ).slice( 1 ) );

    return {
      listItem: item,
      anchor: anchor,
      target: target
    };
  } );

  // Remove missing targets
  tocItems = tocItems.filter( function( item ) {
    return !!item.target;
  } );

  var path = [];
  var pathIndent;

  tocItems.forEach( function( item, i ) {

    var x = item.anchor.offsetLeft - 5,
      y = item.anchor.offsetTop,
      height = item.anchor.offsetHeight;

    if( i === 0 ) {
      path.push( 'M', x, y, 'L', x, y + height );
      item.pathStart = 0;
    }
    else {
      // Draw an additional line when there's a change in
      // indent levels
      if( pathIndent !== x ) path.push( 'L', pathIndent, y );

      path.push( 'L', x, y );

      // Set the current path so that we can measure it
      tocPath.setAttribute( 'd', path.join( ' ' ) );
      item.pathStart = tocPath.getTotalLength() || 0;

      path.push( 'L', x, y + height );
    }

    pathIndent = x;

    tocPath.setAttribute( 'd', path.join( ' ' ) );
    item.pathEnd = tocPath.getTotalLength();

  } );

  pathLength = tocPath.getTotalLength();

  sync();

}

function sync() {

  var windowHeight = window.innerHeight;

  var pathStart = pathLength,
    pathEnd = 0;

  var visibleItems = 0;

  tocItems.forEach( function( item ) {

    var targetBounds = item.target.getBoundingClientRect();

    if( targetBounds.bottom > windowHeight * TOP_MARGIN && targetBounds.top < windowHeight * ( 1 - BOTTOM_MARGIN ) ) {
      pathStart = Math.min( item.pathStart, pathStart );
      pathEnd = Math.max( item.pathEnd, pathEnd );

      visibleItems += 1;

      item.listItem.classList.add( 'visible' );
    }
    else {
      item.listItem.classList.remove( 'visible' );
    }

  } );

  // Specify the visible path or hide the path altogether
  // if there are no visible items
  if( visibleItems > 0 && pathStart < pathEnd ) {
    if( pathStart !== lastPathStart || pathEnd !== lastPathEnd ) {
      tocPath.setAttribute( 'stroke-dashoffset', '1' );
      tocPath.setAttribute( 'stroke-dasharray', '1, '+ pathStart +', '+ ( pathEnd - pathStart ) +', ' + pathLength );
      tocPath.setAttribute( 'opacity', 1 );
    }
  }
  else {
    tocPath.setAttribute( 'opacity', 0 );
  }

  lastPathStart = pathStart;
  lastPathEnd = pathEnd;

}


//fade in effect

$(window).on("load",function() {
  $(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + $(this).outerHeight();

      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(200,1);}
      }
    });
  }).scroll(); //invoke scroll-handler on page-load
});


function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const obj = document.getElementById("value");
animateValue(obj, 0, 1648, 5000);
