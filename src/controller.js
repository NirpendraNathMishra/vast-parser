import { readXmlFromFile, readXmlFromUrl, parseAndStoreVast, queryVastById } from './services.js';

export const handleReadFromFile = async (filePath) => {
  const xmlContent = await readXmlFromFile(filePath);
  const vast = await parseAndStoreVast(xmlContent);
  return vast;
};

export const handleReadFromUrl = async (url) => {
  const xmlContent = await readXmlFromUrl(url);
  const vast = await parseAndStoreVast(xmlContent);
  return vast;
};

export const handleQueryById = async (id) => {
  return queryVastById(id);
};
