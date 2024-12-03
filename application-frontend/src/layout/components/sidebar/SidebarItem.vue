<template>
    <div v-if="!props.item.hidden">
        <template v-if="hasOneShowChild(props.item.children, props.item) && !props.alwaysShow">
            <AppLink :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" v-if="!props.item.children">
                    {{ onlyOneChild.meta.title }}
                </el-menu-item>
            </AppLink>
        </template>
        <el-sub-menu v-else :index="props.basePath">
            <template #title>
                <span>{{ props.item.meta.title }}</span>
            </template>
            <SidebarItem v-for="child in props.item.children" :key="child.path" :item="child"
                :base-path="resolvePath(child.path)">
            </SidebarItem>
        </el-sub-menu>
    </div>
</template>

<script setup>
import AppLink from './AppLink.vue';
import SidebarItem from './SidebarItem.vue'
import path from 'path-browserify'

const props = defineProps({
    item: {
        type: Object,
        requird: true
    },
    basePath: {
        type: String,
        default: ''
    }
})
function isExternal(path) {
    return /^(http:|https?:|tel:|mailto:)/.test(path);
}
function resolvePath(routePath) {
    if (isExternal(routePath)) {
        return routePath;
    }
    if (isExternal(props.basePath)) {
        return props.basePath;
    }
    return path.resolve(props.basePath, routePath);
}
const onlyOneChild = ref({});
function hasOneShowChild(children, parent) {
    if (!children) {
        children = []
    }
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        } else {
            onlyOneChild.value = item
            return true
        }
    })
    if (showingChildren.length === 1) {
        return true
    }
    if (showingChildren.length === 0) {
        onlyOneChild.value = {
            ...parent,
            path: ''
        }
        return true
    }
    return false
}
</script>


<style></style>