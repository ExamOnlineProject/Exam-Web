<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
<<<<<<< HEAD
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 学生监控 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="考试名称" align="center">{{ papername }}</el-table-column>
                <el-table-column prop="username" label="学号" align="center"></el-table-column>
                <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
                <el-table-column label="监控视频" align="center">
                    <!-- <Monitor :paperid="paperid" :stuid="id"></Monitor> -->
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="playVideo(scope.$index, scope.row)">查看监控</el-button>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="操作" width="500" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="playVideo(scope.$index, scope.row)">查看监控</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
    </div>
</template>

<script>
import Monitor from './monitor.vue';
import { selectMontiorStudent } from '../../../api/MonitorAPI';
export default {
    name: 'live',
    data() {
        return {
            paperid: 1,
            tableData: [],
            papername: ''
        };
    },
    created() {
        this.paperid = this.$route.query.paperid;
        this.papername = this.$route.query.papername;
    },
    mounted() {
        console.log(this.papername);
        this.getStudentInfo();
    },
    methods: {
        getStudentInfo() {
            selectMontiorStudent({ paperid: this.paperid }).then(res => {
                console.log(res);
                this.tableData = res.data;
            });
        },
        playVideo(index, row) {
            console.log(row.paperid);
            this.$router.push({
                path: '/monitor',
                query: {
                    paperid: this.paperid,
                    stuid: row.id,
                    stuname: row.name,
                    stuusername: row.username,
                    papername: this.papername
                }
            });
        }
    },

    components: {
        Monitor
    }
};
</script>

<style scoped>

=======
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 实时监控 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="flv_box">
            <video id="myvideo" controls autoplay muted></video>
            <button @click="onClick()">播放</button>
            <button @click="clickStop()">暂停</button>
        </div>
    </div>
</template>
<script>
import flv from 'flv.js';
export default {
    name: 'flv',
    components: {},
    data() {
        return {
            player: null,
            playing: false,
            pagerid: 1
        };
    },
    created() {
        if (flv.isSupported()) {
            this.player = flv.createPlayer({
                type: 'flv',
                // type: 'video/mp4',
                url: 'http://103.45.186.126:8080/live?port=9999&app=myapp&stream=mystream' //视频资源路径  支持：http
            });
        }
    },
    mounted() {
        var video = document.querySelector('#myvideo');
        this.player.attachMediaElement(video);
        this.player.load();

        this.pagerid = this.$router.params.pagerid;

        console.log(this.pagerid);
    },
    methods: {
        onClick() {
            console.log('播放');
            this.player.play();
            this.playing = true;
        },
        clickStop() {
            console.log('暂停');
            this.player.pause();
            this.playing = false;
        }
    }
};
</script>
<style scoped>
.flv_box {
    width: 100%;
    height: 100vh;
}
#myvideo {
    width: 100%;
    height: 400px;
}
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
</style>
