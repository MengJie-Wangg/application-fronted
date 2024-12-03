<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <div>
                <navbar></navbar>
                <tagsview></tagsview>
            </div>
            <appmain></appmain>
        </div>
    </div>
</template>

<script setup>
import sidebar from './components/sidebar/index.vue'
import navbar from './components/Navbar.vue'
import tagsview from './components/tagsview/index.vue'
import appmain from './components/AppMain.vue'

</script>


<style lang="scss" scoped>
.app-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
}

</style>