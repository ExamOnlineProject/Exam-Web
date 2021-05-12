<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 考试监控 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="starttime" label="考试开始时间" align="center"></el-table-column>
                <el-table-column prop="finishtime" label="考试结束时间" align="center"></el-table-column>
                <el-table-column label="状态" align="center">正在监控</el-table-column>
                <el-table-column label="操作" width="500" align="center">
                    <el-button type="primary" icon="el-icon-edit" @click="playVideo(pagerid)">查看监控</el-button>
                </el-table-column>
            </el-table>
        </div>

        <el-button type="primary" @click="playVideo()">查看监控</el-button>
    </div>
</template>

<script>
import { getMonitorPaper } from '../../../api/MonitorAPI';
export default {
    name: 'user',
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            getMonitorPaper(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
            });
        },
        playVideo(pagerid) {
            console.log(pagerid);
            this.$router.push({
                path: '/test_monitor_live',
                params: {
                    pagerid: pagerid
                }
            });
        }
    }
};
</script>

<style scoped></style>
