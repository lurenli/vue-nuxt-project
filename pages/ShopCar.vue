<template>
    <div class="ShopCar">
      <NewHeader/>
      <nuxt-child />
      <My-Footer/>
    </div>
</template>
<style ></style>
<script>
  import NewHeader from "../components/Header/NewHeader"
  import MyFooter from "../components/Footer/Footer"
    export default {
        components: {NewHeader,MyFooter},
        name: "ShopCar",
        data: function () {
            return {

            }
        }
    }
  </script>
