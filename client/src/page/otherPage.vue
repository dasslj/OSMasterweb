<!-- 

这个页面目前的作用是，存放一些函数的废案，防止以后有用又要重新写

 -->


<template>
  <div class="main">
    <h1>尽请期待</h1>
  </div>
</template>

<script setup>
import Recorder from "js-audio-recorder";

// 开启录音
const startRecord = () => {
  const recorder = new Recorder();
  Recorder.getPermission().then(() => {
    if (microphoneStatus.value) {
      console.log("录音停止");
      recorder.stop();
      // recorder.play(); // 播放录音
      microphoneStatus.value = !microphoneStatus.value;

      // 保存录音到本地
      // 是否下载录音
      const isSaveAudio = window.confirm("是否保存录音");
      if (isSaveAudio) {
        saveAudioToLocal(recorder);
      }
      // 发送录音到服务器
      const isPostAudio = window.confirm("是否上传录音");
      if (isPostAudio) {
        postAdiuo(recorder);
      }
    } else {
      console.log("开始录音");
      recorder.start();
      microphoneStatus.value = !microphoneStatus.value;
    }
  });
};

// 将录音上传到本地
const saveAudioToLocal = (recorder) => {
  recorder.downloadWAV(new Date().getTime() + "录音");
};

// 向服务端发送问题（语音）（未完成）
const postAdiuo = (recorder) => {
  console.log("发送语音");
  const formData = new FormData();
  const blob = recorder.getWAVBlob(); // 获取wav格式音频数据
  const audioBlob = new Blob([blob], { type: "audio/wav" });
  const fileOfBlob = new File([audioBlob], new Date().getTime() + ".wav");
  formData.append("file", audioBlob);
  formData.append("id", 1);
  formData.append("name", "Audio");
  // axios.post(url, formData).then((res) => {
  //   console.log(res.data.data[0].url);
  // });
  console.log(blob);
  console.log(audioBlob);
  console.log(fileOfBlob);

  console.dir(formData.get("file"));

  axios({
    method: "post",
    url: "http://127.0.0.1:8888/one/audio",
    data: audioBlob,
  }).then((res) => {
    console.log(res.data);
  });
};

// 获取当前对话的id
const getTopicId = () => {
  return chatId.value;
};

</script>

<style scoped>
.main {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
  width: 100%;
  height: 50em;
}
</style>