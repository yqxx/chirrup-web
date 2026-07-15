<template>
  <div class="page">
    <SiteHeader />
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowSection />
      <DownloadSection />
      <GuideSection />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import HowSection from '@/components/HowSection.vue'
import DownloadSection from '@/components/DownloadSection.vue'
import GuideSection from '@/components/GuideSection.vue'
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
