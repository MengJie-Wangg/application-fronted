<template>
    <div>
        <logo></logo>
        <el-scrollbar>
            <el-menu :background-color="computedVariables.menuBackGround" unique-opened="true" text-color="#fff"
                active-text-color="#ffd04b">
                <SidebarItem v-for="(route,index) in permissionStore.sidebarRouters" :item="route" :key="route.path + index" :base-path="route.path"
                </SidebarItem>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue';
import {usePermissionStore} from '@/store/modules/permission';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
console.log(router.getRoutes());
const computedVariables = computed(() => {
    return { menuBackGround: '$base-menu-background' };
});

const permissionStore = usePermissionStore();
</script>


<style scoped lang="scss">

.el-scrollbar {
    height: calc(100% - 50px);
}
</style>