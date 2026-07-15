<template>
  <div class="page">
    <SiteHeader />
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowSection />
      <GetStartedSection />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import HowSection from '@/components/HowSection.vue'
import GetStartedSection from '@/components/GetStartedSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
