<template>
  <header class="banner text-center">
    <h1 class="h1 text-white fw-bold lh-lg">
      我的多餘<br>你來撿便宜
    </h1>
    <div class="mt-10">
      <RouterLink to="/products" class="custom-btn position-relative fs-5">
        馬上去逛！
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.banner{
  background-image: linear-gradient(rgba(0, 0, 0, 0),rgb(0,0,0,2)) ,url(@/assets/images/front/homepage/banner-image.jpg);
  background-size: cover;
  padding-top: 180px;
  padding-bottom: 280px;
}

.custom-btn{
  display: inline-block;
  text-decoration: none;
  background-color: #f8f9fa;
  color:#000;
  border-radius: 4px;
  padding: 20px 60px;
}

.custom-btn::before{
  content: '';
  position: absolute;
  inset: 0;
  border:2px solid #f8f9fa;
  border-radius: 4px;
  transition: top,bottom,left,right,100ms ease-in-out;
}

.custom-btn:hover::before,
.custom-btn:focus::before{
  inset: -8px;
}

</style>