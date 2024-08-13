import { Vast } from './model.js';
import { parseXml } from './xmlparser.js';

export const readXmlFromFile = async (filePath) => {
  const fs = await import('fs/promises');
  return fs.readFile(filePath, 'utf-8');
};

export const readXmlFromUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

export const parseAndStoreVast = async (xmlContent) => {
  const vastData = await parseXml(xmlContent);
  const vast = new Vast(vastData);
  await vast.save();
  return vast;
};

export const queryVastById = async (id) => {
  return Vast.findById(id);
};
