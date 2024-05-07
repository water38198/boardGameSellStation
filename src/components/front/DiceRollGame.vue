<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      player: 1,
      computer: 1,
    };
  },
  methods: {
    getRandomNumber() {
      this.player = Math.floor(Math.random() * 6 + 1);
      this.computer = Math.floor(Math.random() * 6 + 1);
    },
    startGame() {
      // 骰子速度快 => 慢
      const intervalFast = setInterval(() => {
        this.getRandomNumber();
      }, 50);
      let intervalSlow = null;
      setTimeout(() => {
        clearInterval(intervalFast);
        intervalSlow = setInterval(() => {
          this.getRandomNumber();
        }, 200);
      }, 500);
      setTimeout(() => {
        clearInterval(intervalSlow);
      }, 1400);
      setTimeout(() => {
        this.showResult();
      }, 2000);
    },
    showResult() {
      if (this.player > this.computer) {
        Swal.fire({
          icon: 'success',
          title: '恭喜，你獲勝了',
          html: "<p>八折優惠券:<span class='text-themeDark'>DiceGameWinner</span></p>",
          confirmButtonColor: '#0fb99b',
          confirmButtonText: '複製',
        }).then((res) => {
          if (res.isConfirmed) {
            navigator.clipboard.writeText('DiceGameWinner');
            Swal.fire({
              icon: 'success',
              title: '已複製到剪貼簿',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '哇...',
          text: '很可惜，沒有獲勝，再來一次吧',
          confirmButtonColor: '#0fb99b',
        });
      }
    },
  },
};
</script>

<template>
<!-- Button trigger modal -->
  <button type="button" class="btn active-button" data-bs-toggle="modal"
  data-bs-target="#DiceGameModal">
    <img src="@/assets/dice-icon.png" alt="dice" />
    <span class="text-white d-none d-md-inline"> 點我拿優惠券!!</span>
  </button>
<!-- Modal -->
  <div class="modal fade" id="DiceGameModal" tabindex="-1"
  aria-labelledby="DiceGameModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="DiceGameModalLabel">骰子比大小</h1>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <p>規則：只要擲出比對手大的骰子點數即可獲得優惠券代碼。</p>
          <div>
            你:
            <div class="text-themeDark">
              <i class="bi" :class="`bi-dice-${player}`"></i>
            </div>
          </div>
          <div>
            對手:
            <div class="text-danger">
              <i class="bi" :class="`bi-dice-${computer}`"></i>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-theme text-white"
          @click="startGame">投骰子</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active-button{
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: hsl(169deg, 100%, 15%);
  &:hover{
    opacity: .8;
  }
}

.modal-body > div{
  min-height: 150px;
}

i.bi{
  font-size: 80px;
}
</style>
