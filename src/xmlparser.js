import { parseStringPromise } from 'xml2js';

export const parseXml = async (xmlContent) => {
  const result = await parseStringPromise(xmlContent);
  const vast = result.VAST;
  if (!vast || !vast.Ad || !vast.Ad[0]) {
    throw new Error('Invalid VAST XML structure');
  }

  const ad = vast.Ad[0];
  const inLine = ad.InLine ? ad.InLine[0] : null;
  if (!inLine) {
    throw new Error('Invalid VAST XML structure: Missing InLine');
  }

  const impression = {
    id: inLine.Impression && inLine.Impression[0] ? inLine.Impression[0].$.id : '',
    url: inLine.Impression && inLine.Impression[0] ? inLine.Impression[0]._ : '',
  };

  const creatives = inLine.Creatives && inLine.Creatives[0] ? inLine.Creatives[0].Creative.map((creative) => {
    const linear = creative.Linear ? creative.Linear[0] : null;
    const companionAds = creative.CompanionAds ? creative.CompanionAds[0] : null;

    const mediaFiles = linear && linear.MediaFiles && linear.MediaFiles[0] && linear.MediaFiles[0].MediaFile ? linear.MediaFiles[0].MediaFile.map((mediaFile) => ({
      type: mediaFile.$.type,
      bitrate: parseInt(mediaFile.$.bitrate, 10),
      width: parseInt(mediaFile.$.width, 10),
      height: parseInt(mediaFile.$.height, 10),
      source: mediaFile._,
    })) : [];

    const trackingEvents = linear && linear.TrackingEvents && linear.TrackingEvents[0] && linear.TrackingEvents[0].Tracking ? linear.TrackingEvents[0].Tracking.map((tracking) => ({
      eventType: tracking.$.event,
      url: tracking._,
    })) : [];

    const videoClicks = linear && linear.VideoClicks && linear.VideoClicks[0] && linear.VideoClicks[0].ClickTracking ? linear.VideoClicks[0].ClickTracking.map((click) => ({
      id: click.$.id,
      url: click._,
    })) : [];

    const companionBanners = companionAds && companionAds.Companion ? companionAds.Companion.map((companion) => ({
      id: companion.$.id,
      width: parseInt(companion.$.width, 10),
      height: parseInt(companion.$.height, 10),
      type: companion.StaticResource && companion.StaticResource[0] && companion.StaticResource[0].$ ? companion.StaticResource[0].$.creativeType : '',
      source: companion.StaticResource && companion.StaticResource[0] ? companion.StaticResource[0]._ : '',
      clickThroughUrl: companion.CompanionClickThrough && companion.CompanionClickThrough[0] ? companion.CompanionClickThrough[0]._ : '',
    })) : [];

    return {
      id: creative.$.id,
      duration: linear ? linear.Duration[0] : '',
      mediaFiles,
      trackingEvents,
      videoClicks,
      companionBanners,
    };
  }).filter(Boolean) : [];

  return {
    version: vast.$.version,
    id: ad.$.id,
    title: inLine.AdTitle[0],
    description: inLine.Description[0],
    impression,
    creatives,
  };
};
