<template>
  <MyContainer>
    <MyLogo />
    <router-view></router-view>
  </MyContainer>
</template>

<script setup>
import MyLogo from "@/components/MyLogo.vue";
import MyContainer from "@/UI/MyContainer.vue";
</script>

<style lang="scss"></style>
