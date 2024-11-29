<template>
    <div class="crud-component">
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button type="primary" @click="handleEdit">编辑</el-button>
      <el-button type="primary" @click="handleDelete">删除</el-button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Crud',
    methods: {
      handleCreate() {
        // 执行创建操作
        console.log('Create button clicked');
      },
      handleEdit() {
        // 执行编辑操作
        console.log('Edit button clicked');
      },
      handleDelete() {
        // 执行删除操作
        console.log('Delete button clicked');
      },
    },
  });
  </script>
  