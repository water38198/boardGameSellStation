<script>
import Swal from "sweetalert2";

export default {
  methods: {
    randomDice() {
      const random1 = Math.floor(Math.random() * 10);
      const random2 = Math.floor(Math.random() * 10);
      if (random1 >= 1 && random1 <= 6 && random2 >= 1 && random2 <= 6) {
        this.rollDice(random1, random2);
      } else {
        this.randomDice();
      }
    },
    rollDice(random1, random2) {
      this.$refs.dice1.style.animation = ` rolling ${random1 / 2}s`;
      this.$refs.dice2.style.animation = ` rolling ${random2 / 2}s`;
      setTimeout(() => {
        switch (random1) {
          case 1:
            this.$refs.dice1.style.transform = "rotateX(0deg) rotateY(0deg)";
            break;
          case 6:
            this.$refs.dice1.style.transform = "rotateX(180deg) rotateY(0deg)";
            break;
          case 2:
            this.$refs.dice1.style.transform = "rotateX(-90deg) rotateY(0deg)";
            break;
          case 5:
            this.$refs.dice1.style.transform = "rotateX(90deg) rotateY(0deg)";
            break;
          case 3:
            this.$refs.dice1.style.transform = "rotateX(0deg) rotateY(90deg)";
            break;
          case 4:
            this.$refs.dice1.style.transform = "rotateX(0deg) rotateY(-90deg)";
            break;
          default:
            break;
        }
        this.$refs.dice1.style.animation = "none";
      }, (random1 / 2) * 1000 + 50);
      setTimeout(() => {
        switch (random2) {
          case 1:
            this.$refs.dice2.style.transform = "rotateX(0deg) rotateY(0deg)";
            break;
          case 6:
            this.$refs.dice2.style.transform = "rotateX(180deg) rotateY(0deg)";
            break;
          case 2:
            this.$refs.dice2.style.transform = "rotateX(-90deg) rotateY(0deg)";
            break;
          case 5:
            this.$refs.dice2.style.transform = "rotateX(90deg) rotateY(0deg)";
            break;
          case 3:
            this.$refs.dice2.style.transform = "rotateX(0deg) rotateY(90deg)";
            break;
          case 4:
            this.$refs.dice2.style.transform = "rotateX(0deg) rotateY(-90deg)";
            break;
          default:
            break;
        }
        this.$refs.dice2.style.animation = "none";
      }, (random2 / 2) * 1000 + 50);
      const totalTime =
        (random1 / 2) * 1000 + 50 > (random2 / 2) * 1000 + 50
          ? (random1 / 2) * 1000 + 50 + 1500
          : (random2 / 2) * 1000 + 50 + 1500;
      setTimeout(() => {
        const resault = random1 >= random2;
        if (resault) {
          Swal.fire({
            icon: "error",
            title: "哇...",
            text: "很可惜你輸了，再來一次吧",
            confirmButtonColor: "#0fb99b",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "恭喜，你獲勝了",
            html: "<p>八折優惠券:<span class='text-themeDark'>DiceGameWinner</span></p>",
            confirmButtonColor: "#0fb99b",
            confirmButtonText: "複製",
          }).then((resault) => {
            if (resault.isConfirmed) {
              navigator.clipboard.writeText("DiceGameWinner");
              Swal.fire({
                icon: "success",
                title: "已複製到剪貼簿",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
        }
      }, totalTime);
    },
  },
};
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade mt-5"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">骰子比大小</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>規則：只要擲出比對手大的骰子點數即可獲勝</p>
          <div class="game">
            <div class="dice-container">
              對手的骰子：
              <div class="dice1 my-3" ref="dice1">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
                <div class="face right"></div>
                <div class="face left"></div>
              </div>
              你的骰子：
              <div class="dice2 my-3" ref="dice2">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
                <div class="face right"></div>
                <div class="face left"></div>
              </div>
              <button class="roll" @click="randomDice()" type="button">
                扔骰子!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.game {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0fb99b;
}
.dice-container {
  display: grid;
  place-items: center;
  width: 80%;
  padding: 20px 0 20px;
  border-radius: 30px;
  background: #eeeeee;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
/*
    Dice Styles
*/
.dice1 {
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: 1s ease;
}
.dice2 {
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: 1s ease;
}
@keyframes rolling {
  50% {
    transform: rotateX(455deg) rotateY(455deg);
  }
}
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 5px solid #f6f3f0;
  transform-style: preserve-3d;
  background: linear-gradient(145deg, #dddbd8, #fff);
}
.face::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: #f6f3f0;
  transform: translateZ(-1px);
}
.face::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #131210;
}
.front {
  transform: translateZ(50px);
}
.back {
  transform: rotateX(180deg) translateZ(50px);
}
.top {
  transform: rotateX(90deg) translateZ(50px);
}
.bottom {
  transform: rotateX(-90deg) translateZ(50px);
}
.right {
  transform: rotateY(90deg) translateZ(50px);
}
.left {
  transform: rotateY(-90deg) translateZ(50px);
}
.front::after {
  width: 30px;
  height: 30px;
  background: #f63330;
  margin: -15px 0 0 -15px;
}
.back::after {
  margin: -35px 0 0 -30px;
  box-shadow: 40px 0, 0 25px, 40px 25px, 0 50px, 40px 50px;
}
.top::after {
  margin: -30px 0 0 -30px;
  box-shadow: 40px 40px;
}
.bottom::after {
  margin: -36px 0 0 -36px;
  box-shadow: 26px 26px, 52px 52px, 52px 0, 0 52px;
}
.right::after {
  margin: -30px 0 0 -30px;
  box-shadow: 40px 0, 0 40px, 40px 40px;
}
.left::after {
  margin: -35px 0 0 -35px;
  box-shadow: 25px 25px, 50px 50px;
}
/*
    Roll Button styles
*/
.roll {
  cursor: pointer;
  color: #0fb99b;
  margin-top: 60px;
  padding: 6px 12px;
  border-radius: 3px;
  font: 700 16px "Montserrat";
  border: 2px solid #0fb99b;
  transition: 0.4s;
}
.roll:hover {
  color: #fff;
  background: #0fb99b;
}
</style>
