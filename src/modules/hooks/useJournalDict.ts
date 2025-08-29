import { useState } from "react";
import { getDateLabels } from "../utils/Date";

type Task = string

export interface JournalDict {
  [year: string]: {
    [month: string]: {
      [week: string]: {
        [day: string]: {
          [project: string]: Task[]
        }
      }
    }
  }
}

const getExampleDict = (): JournalDict => {
  const [yearLabel, monthLabel, weekLabel, dayLabel] = getDateLabels(new Date());
  return {
    [yearLabel]: { [monthLabel]: { [weekLabel]: { [dayLabel]: {
      "Example Project": [
        "Example task 1",
        "Example task 2"
      ]
    }}}}
  };
};

export function useJournalDict() {
  const [dict, setDict] = useState<JournalDict>(getExampleDict);
  return [dict, setDict] as const;
}

