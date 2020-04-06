import {
  Message
} from 'element-ui'
// media配置选项
const constraints = {
  video: true,
  audio: false
};
const state = {
  // 检测当前浏览器是否支持拍照
  canPhoto: true,
  // 获取媒体对象
  getUserMedia: null,
  // 当前是否正在录制头像
  videoPlaying: false,
  // 流
  stream: null,
  // 拍摄的图片
  photo: ''
}

const mutations = {
  // 拍照初始化
  INIT_GETUSERMEDIA(state) {
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (!getUserMedia) {
      state.canPhoto = false
      return
    }
    state.getUserMedia = new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  },

  // video播放
  SHOW_VIDEO(state, video) {
    const promise = state.getUserMedia;
    promise.then(stream => {
      state.stream = stream;
      // 旧的浏览器可能没有srcObject
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        // 防止再新的浏览器里使用它，应为它已经不再支持了
        video.src = window.URL.createObjectURL(stream);
      }
      video.onloadedmetadata = function (e) {
        video.play();
        state.videoPlaying = true;
      };
    }).catch(err => {
      console.log(err)
      Message.error('人脸识别调用失败，请刷新重试！')
    })
  },

  // 拍照
  TAKE_PHOTO(state, {
    video,
    canvas
  }) {
    if (state.videoPlaying) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imgBase64 = canvas.toDataURL('image/webp');
      state.photo = imgBase64;
    }
  },

  // 关闭摄像头
  CLOSE_CAMERA(state) {
    state.stream.getTracks()[0].stop();
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
