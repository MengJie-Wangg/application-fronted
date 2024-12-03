<template>
    <component :is="type" v-bind="linkProps(props.to)">
        <slot></slot>
    </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
const type = computed(() => {
    return isExternal ? 'a' : 'router-link';
})
const isExternal = computed(() => {
    return /^(http:|https?:|tel:|mailto:)/.test(props.to);
})
function linkProps(to) {
    if (isExternal) {
        return {
            href: props.to,
            target: '_blank'
        }
    }
    return {
        to: props.to
    }
}

</script>


<style scoped lang="scss"></style>