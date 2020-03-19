export const caremaStart = (video, observerData) => {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }
  const constraints = {
    video: true,
    audio: false
  };
  let promise = navigator.mediaDevices.getUserMedia(constraints);
  promise.then(stream => {
    if ("srcObject" in video) {
      video.srcObject = stream;
    } else {
      video.src = window.URL.createObjectURL(stream);
    }
    video.onloadedmetadata = function (e) {
      video.play();
      observerData.videoPlaying = true;
      observerData.stream = stream.getTracks()[0];
    };
  }).catch(err => {
    console.error(err.name + ": " + err.message);
  })
}

export const getPhoto = (video, canvas, videoPlaying) => {
  if (videoPlaying) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/webp');
    return data;
  }
  return null;
}

export const closeCamera = (stream) => {
  stream.stop()
}
