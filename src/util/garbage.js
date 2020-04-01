import dumpster from "dumpster";
import { getCurrentDate } from "./date";

export function generateNewGarbage() {
  const date = getCurrentDate()
  const id = date.toDateString() + Math.random() * 100; // do I even need this lol
  dumpster.setItem('inProgress', {
    id,
    date,
  })
  dumpster.setItem(`trash/${id}`, {
    content: '',
    date,
    wordCount: 0,
  });
  dumpster.getItem('dumpster')
    .then((value) => {
      let arrValue = value || [];
      if (arrValue.indexOf(id) === -1) dumpster.setItem('dumpster', [...arrValue, id])
    })
  return { id, date }
}