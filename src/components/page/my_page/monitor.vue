<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 实时监控 </el-breadcrumb-item>
                <el-breadcrumb-item> <i></i> {{papername}} </el-breadcrumb-item>
                <el-breadcrumb-item> <i></i> {{stuusername}} </el-breadcrumb-item>
                <el-breadcrumb-item> <i></i> {{stuname}} </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="flv_box">
                <video id="myvideo" controls autoplay muted></video>
                <button @click="onClick()">播放</button>
                <button @click="clickStop()">暂停</button>
            </div>
        </div>
    </div>
</template>
<script>
import flv from 'flv.js';
export default {
    name: 'monitor',
    // props: {
    //     paperid: Number,
    //     stuid: Number
    // },
    components: {},
    data() {
        return {
            player: null,
            playing: false,
            paperid: 1,
            stuid: 1,
            stuname: '',
            stuusername: '',
            papername: ''
        };
    },
    created() {
        this.paperid = this.$route.query.paperid;
        this.stuid = this.$route.query.stuid;
        this.stuname = this.$route.query.stuname;
        this.stuusername = this.$route.query.stuusername;
        this.papername = this.$route.query.papername;
        if (flv.isSupported()) {
            this.player = flv.createPlayer({
                type: 'flv',
                // type: 'video/mp4',
                url: 'http://103.45.186.126:8080/live?port=9999&app=myapp&stream=' + this.paperid + '_' + this.stuid //视频资源路径  支持：http
            });
            this.player.on(flv.Events.ERROR, (errorType, errorDetail, errorInfo) => {
                console.log('errorType:', errorType);
                console.log('errorDetail:', errorDetail);
                console.log('errorInfo:', errorInfo);
                //视频出错后销毁重新创建
                if (this.player) {
                    this.player.pause();
                    this.player.unload();
                    this.player.detachMediaElement();
                    this.player.destroy();
                    this.player = null;
                    this.createPlayer(videoElement, this.url);
                }
            });
            this.player.on('statistics_info', function(res) {
                if (this.lastDecodedFrame == 0) {
                    this.lastDecodedFrame = res.decodedFrames;
                    return;
                }
                if (this.lastDecodedFrame != res.decodedFrames) {
                    this.lastDecodedFrame = res.decodedFrames;
                } else {
                    this.lastDecodedFrame = 0;
                    if (this.player) {
                        this.player.pause();
                        this.player.unload();
                        this.player.detachMediaElement();
                        this.player.destroy();
                        this.player = null;
                        this.createPlayer(videoElement, this.url);
                    }
                }
            });
            setInterval(() => {
                if (this.player.buffered.length) {
                    let end = this.player.buffered.end(0); //获取当前buffered值
                    let diff = end - this.player.currentTime; //获取buffered与currentTime的差值
                    if (diff >= 0.5) {
                        //如果差值大于等于0.5 手动跳帧 这里可根据自身需求来定
                        this.player.currentTime = this.player.buffered.end(0); //手动跳帧
                    }
                }
            }, 2000); //2000毫秒执行一次
            console.log(this.stuid);
        }
    },
    mounted() {
        var video = document.querySelector('#myvideo');
        this.player.attachMediaElement(video);
        this.player.load();
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
    height: 75vh;
}
#myvideo {
    width: 100%;
    height: 100%;
}
.el-icon-lx-cascades.important  {
    color: #FFF;
}
</style>
