const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const audio = document.querySelectorAll("audio");

let i = 0;
let num = 0;
const deg = 45;
let active = 0;
const len = lists.length - 1;

//article의 갯수만큼 반복을 돌면서
for (let el of lists) {
  //article의 위치값을 설정 -> 45회전하는 것들로
  el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
  //각 article의 .pic에 백그라운드 이미지 넣을것
  let pic = el.querySelector(".pic");
  pic.style.backgroundImage = `url(img/member${i + 1}.jpg)`;
  i++;

  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");
  const load = el.querySelector(".load");

  play.addEventListener("click", (e) => {
    //클릭한 버튼의(play)의 부모를 찾아서 활성화(on)되어있는지를 판별해서 변수로 저장(boolean)
    let isActive = e.currentTarget.closest("article").classList.contains("on");

    if (isActive) {
      //클릭한 타겟의(이벤트리스너가 붙은 대상)가장 가까이 있는 아티클을 찾은후, 그 안에있는 .pic찾고 여기에 on을 붙인다.
      e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
      el.querySelector("audio").play();
    }
  });

  //일시정지 버튼
  pause.addEventListener("click", (e) => {
    let isActive = e.currentTarget.closest("article").classList.contains("on");

    if (isActive) {
      //클릭한 타겟의(이벤트리스너가 붙은 대상)가장 가까이 있는 아티클을 찾은후, 그 안에있는 .pic찾고 여기에 on을 붙인다.
      e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
      el.querySelector("audio").pause();
    }

  })

  //load버튼

  load.addEventListener("click", (e) => {
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if (isActive) {
      //클릭한 타겟의(이벤트리스너가 붙은 대상)가장 가까이 있는 아티클을 찾은후, 그 안에있는 .pic찾고 여기에 on을 붙인다.
      e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
      el.querySelector("audio").load();
    }

  })


}


prev.addEventListener("click", () => {


  initMusic();

  num++;
  frame.style.transform = `rotate(${num * deg}deg)`;

  //아티클은 8개 - lists배열에는 [0,1,2,3,4,5,6,7];
  //7,6,5,4,3,2,1,0 -> 7,6,5,4,3,2,1,0 

  //현재 활성화 article순서값 설정
  if (active == 0) {
    active = len;
  } else {
    active--;
  }


  activation(lists, active);

  //3항연산자 
  // (active == 0) ? active = len : active--;

});

next.addEventListener("click", () => {
  initMusic();
  num--;
  frame.style.transform = `rotate(${num * deg}deg)`;

  //0,1,2,3,4,5,6,7 -> 0,1,2,3,4,5,6,7
  if (active == len) {
    active = 0;
  } else {
    active++;
  }
  activation(lists, active);
})


//활성화 함수
function activation(arr, index) {
  for (let el of arr) el.classList.remove("on");
  arr[index].classList.add("on");
}


function initMusic() {
  for (let el of audio) {
    el.pause();
    el.load();//
    //on을 제거해서 빙빙돌고있는 원반을 멈추기
    el.closest("article").querySelector(".pic").classList.remove("on");
  }
}