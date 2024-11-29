<template>
    <div>
        <el-config-provider :locale="locale">
            <el-pagination
            :current-page="currentPage" 
            :page-size="pageSize" 
            :total="total"
            @current-change="handleCurrentChange" 
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"/>
        </el-config-provider>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineComponent({
    name: 'Pagination',
    setup() {

        const currentPage = ref(1);
        const pageSize = ref(10);
        const total = ref(0);

        const handleCurrentChange = (page: number) => {
            currentPage.value = page;
            // 在这里可以触发请求新的页码数据的方法
        };

        const handleSizeChange = (size: number) => {
            pageSize.value = size;
            currentPage.value = 1;
            // 在这里可以触发请求新的每页条数数据的方法
        };

        return {
            locale: zhCn,
            currentPage,
            pageSize,
            total,
            handleCurrentChange,
            handleSizeChange,
        };
    },
});
</script>