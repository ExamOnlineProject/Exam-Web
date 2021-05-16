<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 考试监控 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
<<<<<<< HEAD
                <el-table-column prop="papername" label="考试名称" align="center"></el-table-column>
=======
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
                <el-table-column prop="starttime" label="考试开始时间" align="center"></el-table-column>
                <el-table-column prop="finishtime" label="考试结束时间" align="center"></el-table-column>
                <el-table-column label="状态" align="center">正在监控</el-table-column>
                <el-table-column label="操作" width="500" align="center">
<<<<<<< HEAD
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="playVideo(scope.$index, scope.row)">查看监控</el-button>
                    </template>
=======
                    <el-button type="primary" icon="el-icon-edit" @click="playVideo(pagerid)">查看监控</el-button>
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
                </el-table-column>
            </el-table>
        </div>

<<<<<<< HEAD
        <!-- <el-button type="primary" @click="playVideo()">查看监控</el-button> -->
=======
        <el-button type="primary" @click="playVideo()">查看监控</el-button>
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
    </div>
</template>

<script>
import { getMonitorPaper } from '../../../api/MonitorAPI';
export default {
    name: 'user',
    data() {
        return {
<<<<<<< HEAD
            tableData: [],
=======
            tableData: []
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
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
<<<<<<< HEAD
        playVideo(index, row) {
            console.log(row.paperid);
            this.$router.push({
                path: '/test_monitor_live',
                query: {
                    paperid: row.paperid,
                    papername: row.papername
=======
        playVideo(pagerid) {
            console.log(pagerid);
            this.$router.push({
                path: '/test_monitor_live',
                params: {
                    pagerid: pagerid
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
                }
            });
        }
    }
};
</script>

<style scoped></style>
