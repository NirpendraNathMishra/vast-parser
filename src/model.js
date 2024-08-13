import mongoose from 'mongoose';

const MediaFileSchema = new mongoose.Schema({
  type: String,
  bitrate: Number,
  width: Number,
  height: Number,
  source: String,
});

const TrackingEventSchema = new mongoose.Schema({
  eventType: String,
  url: String,
});

const VideoClickSchema = new mongoose.Schema({
  id: String,
  url: String,
});

const CompanionBannerSchema = new mongoose.Schema({
  id: String,
  width: Number,
  height: Number,
  type: String,
  source: String,
  clickThroughUrl: String,
});

const CreativeSchema = new mongoose.Schema({
  id: String,
  duration: String,
  mediaFiles: [MediaFileSchema],
  trackingEvents: [TrackingEventSchema],
  videoClicks: [VideoClickSchema],
  companionBanners: [CompanionBannerSchema],
});

const ImpressionSchema = new mongoose.Schema({
  id: String,
  url: String,
});

const VastSchema = new mongoose.Schema({
  version: String,
  id: String,
  title: String,
  description: String,
  impression: ImpressionSchema,
  creatives: [CreativeSchema],
});

const Vast = mongoose.model('Vast', VastSchema);

export { Vast };

//export default mongoose.model('Vast', VastSchema);
