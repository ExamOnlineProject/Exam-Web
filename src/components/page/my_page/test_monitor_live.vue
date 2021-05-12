<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
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
</style>
