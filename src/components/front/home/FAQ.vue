<template>
  <section class="container faq">
    <div class="text-center faq-icon">
      <i class="bi bi-question-circle-fill"></i>
    </div>
    <h2 class="h2 fs-1 text-center">FAQ常見問題</h2>
    <p class="fs-5 fs-md-4 text-b60 my-4 my-md-5 text-center">
      如果沒有找到您要的答案，歡迎透過下方電子郵件、FaceBook、IG聯絡我們
    </p>
    <div class="accordion" id="faq">
      <div>
        <h3 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed bg-b20 ps-0 border-bottom fs-2"
          type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
          aria-expanded="false" aria-controls="flush-collapseOne">
            可以貨到付款嗎?
          </button>
        </h3>
        <div id="flush-collapseOne"
        class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
          data-bs-parent="#faq">
          <div class="accordion-body bg-white fs-6 fs-md-5 py-4 py-md-5">
            可以，運費由買家自行負擔。(7-11+35、全家+39、蝦皮+60)
          </div>
        </div>
      </div>
      <div>
        <h3 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed bg-b20 ps-0 fs-2 border-bottom"
          type="button"
            data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false"
            aria-controls="flush-collapseTwo">
            發現內容物不符怎麼辦?
          </button>
        </h3>
        <div id="flush-collapseTwo"
        class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
          data-bs-parent="#faq">
          <div class="accordion-body bg-white fs-6 fs-md-5 py-4 py-md-5">
            請立即與我們聯絡，收貨後超過兩星期則視同無異議。
          </div>
        </div>
      </div>
      <div>
        <h3 class="accordion-header" id="flush-headingThree">
          <button class="accordion-button collapsed bg-b20 ps-0 fs-2 border-bottom"
          type="button"
            data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree">
            有什麼收貨方式呢?
          </button>
        </h3>
        <div id="flush-collapseThree"
        class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
          data-bs-parent="#faq">
          <div class="accordion-body bg-white fs-6 fs-md-5 py-4 py-md-5">
            推薦使用超商貨到付款，少部分特殊商品規格不符只能使用郵局寄送。
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  padding-top: 20px;
  padding-bottom: 40px;

  &-icon {
    margin-bottom: 20px;
    font-size: 60px;
  }

  @media (min-width:992px) {
    padding-top: 80px;
    padding-bottom: 100px;

    &-icon {
      margin-bottom: 80px;
      font-size: 120px;
    }
  }
}
</style>
