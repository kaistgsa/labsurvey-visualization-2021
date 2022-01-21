$("#cl").click(function () {

  $("#salaryDiv").fadeIn('slow');
  var salary = $('#salaryInput').val()
  var res =  [0, 0, 0, 0, 0, 0, 1, 22, 30, 43, 53, 69, 72, 80, 85, 89, 90, 91, 94, 98, 100, 100, 100, 102, 106, 109, 110, 113, 115, 117, 120, 120, 120, 124, 126, 127, 130, 130, 132, 135, 136, 138, 140, 140, 143, 145, 145, 147, 150, 150, 150, 153, 155, 159, 160, 160, 162, 164, 164, 165, 169, 170, 173, 176, 178, 180, 180, 180, 185, 186, 190, 190, 191, 195, 200, 200, 200, 205, 209, 210, 215, 220, 222, 225, 228, 230, 235, 240, 245, 250, 251, 260, 269, 273, 285, 300, 314, 322, 360, 431,]

  const closest = res.reduce((a, b) => {
    return Math.abs(b - salary) < Math.abs(a - salary) ? b : a;
  });
  var n = 100-res.indexOf(closest)

  $('#salaryNth').html(n+'번째');
  const salaryHour = numberWithCommas(parseInt(salary*10000/208))
  const salaryDiff = parseInt(salary*10000/208) - 9160
  if (salaryDiff >=0){
    $('#salaryResult').html('당신이 받고 있는 <mark>'+salary+'만 원</mark>은 주 52시간 근무를 가정했을 때, 시급 <mark>'+salaryHour+'원</mark>이며, 이는 법정 최저시급 9,160원보다 <mark>'+numberWithCommas(salaryDiff)+'원</mark> 많은 금액입니다.')
  }
  else {
    $('#salaryResult').html('당신이 받고 있는 <mark>'+salary+'만 원</mark>은 주 52시간 근무를 가정했을 때, 시급 <mark>'+salaryHour+'원</mark>이며, 이는 법정 최저시급 9,160원에 <mark>'+numberWithCommas(-salaryDiff)+'원</mark> 못 미치는 금액입니다.')
  }



});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
