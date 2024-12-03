<template>

</template>


<script lang="jsx">
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        const { icon, title } = context.props;
        const vnode = [];
        if (icon) {
            //TODO 图标
        }
        if (title) {
            vnode.push(h('span', title));
        }
        return vnode;
    }
}
</script>


<style scoped lang="scss"></style>