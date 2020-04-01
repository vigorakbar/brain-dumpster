import localforage from 'localforage';

const dumpster = localforage.createInstance({
  name: 'brain-dumpster',
});

export default dumpster;
