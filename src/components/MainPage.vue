<template>
  <section class="welcome">
    <h1>Shop for your favorite AirSumin Pro.</h1>
  </section>
</template>

<style scoped>
.welcome {
  width: 100%;
  height: 800px;
  background-image: url("https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/thai-aos-en-banner-hero-20160202?wid=1440&hei=689&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=0");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcome h1 {
  color: #fff;
  font-weight: 1000;
  font-size: 100px;
  text-align: center;
  padding: 100px;
}

/*--- section product ---*/
.product-mac,
.product-iphone,
.product-watch,
.product-ipad {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  cursor: pointer;
}
.product-mac h2,
.product-iphone h2,
.product-watch h2,
.product-ipad h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 20px;
}
.container {
  width: 1070px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}
.grid-product {
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.grid-product:hover {
  background: #e1e1e1;
}
.grid-product img {
  width: 300px;
}
.grid-detail {
  margin: 20px 0;
  text-align: center;
}
.grid-detail p:last-child {
  transition: 0.5s;
  margin-top: 10px;
}
.grid-product:hover > .grid-detail p:last-child {
  color: #3498db;
}

/*-------*/
.grid-full {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.grid-product-full {
  background: #f1f1f1;
  grid-column: span 3;
  display: flex;
  position: relative;
}
.grid-detail-sum {
  position: absolute;
  top: 35%;
  right: 12%;
  text-align: center;
}
.grid-detail-sum h2 {
  font-size: 3rem;
  font-weight: 500;
}
.grid-detail-sum p {
  margin: 20px 0;
}
.grid-detail-sum a {
  color: #3498db;
}
.grid-detail-sum a:hover {
  text-decoration: underline;
}
</style>
