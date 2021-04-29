<template>
  <div class="container">
    <el-form :model="form" label-width="80px" enctype="multipart/form-data">
        <el-upload
          class=""
          action=""
          :on-change="imgBroadcastChange"
          multiple
          accept="image/jpg,image/png,image/jpeg"
          :show-file-list="false"
          :auto-upload="false"
        >
        <img v-if="imgurl" :src="imgurl" class="avatar">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
        </el-upload>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      imgurl: '',
      form: {
        imageUrl: ''
      }
    }
  },
  methods: {
    imgBroadcastChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isLt2M) {
        this.imgurl = URL.createObjectURL(file.raw)
        this.form.imageUrl = file.raw;
      } else {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
    },
     submit() {
       let config = {
        timeout: 30000,
        headers: {
          "Content-Type": "multipart/form-data", //设置headers
        },
      };
     const formData = new FormData();
    // 首先判断是否上传了图片，如果上传了图片，将图片存入到formData中
    formData.append('imageUrl', this.form.imageUrl)
  // console.log(formData.get(0));
         axios.post(
            "http://localhost:8088/exam/upload", //请求后端的url
            formData,
            config
          )
          .then((res) => {
            if (res.data.code == 200) {
              //上传成功
              // alert("上传成功");
              this.$emit('getImageUrl', res.data.data.imgUrl)
              console.log("上传成功");
              this.form.imageUrl = '';
            } else {
              alert('上传失败')
            }
          })
          .catch((error) => {
            console.log("请求失败");
          });
    },
    cancel() {
      this.imgurl = ''
    }
    },
  }
</script>

<style scoped>
.container {
    margin: auto 0;
}
.avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</styles>
