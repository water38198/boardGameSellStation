<template>
  <header class="banner">
    <h1 class="h1 text-white text-center fw-bold lh-lg">
      我的多餘<br />你來撿便宜
    </h1>
    <div class="text-center mt-5">
      <RouterLink to="/products" class="custom-btn position-relative
      btn-border-pop fs-5 ">馬上去逛!</RouterLink>
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
  }
}
.custom-btn{
  text-decoration: none;
  background-color: #f8f9fa;
  color:#000;
  border-radius: 4px;
}
.custom-btn::before{
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border:2px solid #f8f9fa;
  border-radius: 4px;
  transition: top,bottom,left,right,100ms ease-in-out;
}
.custom-btn:hover::before,
.custom-btn:focus::before{
  top: -4px;
  bottom: -4px;
  left: -4px;
  right: -4px;
}

@media (min-width: 576px) {
  .banner {
    padding-top: 230px;
    padding-bottom: 280px;
  }
}
</style>
