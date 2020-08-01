// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const FFmpeg = require('fluent-ffmpeg');
// FFmpeg.setFfmpegPath(ffmpegPath);

module.exports.hello = async (req, res) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      req,
      res,
    },
    null,
    2,
  ),
});
