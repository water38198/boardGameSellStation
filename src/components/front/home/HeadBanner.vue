<template>
  <header class="banner">
    <h1 class="h1 text-white text-center fw-bold lh-lg">
      我的多餘<br />你來撿便宜
    </h1>
    <div class="text-center mt-5">
      <RouterLink to="/products" class="btn btn-light fs-5">馬上去逛!</RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.banner {
  background: url(@/assets/home/banner-image.jpg);
  background-size: cover;
  border-image:fill 0 linear-gradient(rgba(0, 0, 0, 0),rgb(0,0,0,2)) ;
  padding-top: 180px;
  padding-bottom: 280px;
  a{
    padding: 20px 60px;
    box-shadow: 0px 0px 30px rgba(255, 255, 255, .5);
  }
}

@media (min-width: 576px) {
  .banner {
    padding-top: 230px;
    padding-bottom: 280px;
  }
}
</style>
