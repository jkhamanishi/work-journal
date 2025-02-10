import { TaskInfo, useProjectContext } from "../../hooks/useJournalDataContext";
import { insertKeyValuePair } from "../../utils/object-manipulation";
import EditableEntry from "./EditableEntry";


function TaskEntry({task, index}: {task: TaskInfo, index: number}) {
  const { data, save } = useProjectContext(task);
  
  const saveFcn = (newTaskName: string) => {
    data.project[index] = newTaskName
    save();
  }
  const deleteEntry = () => {
    if (!data.project[index]) {
      data.project.splice(index, 1);
      save();
    }
  }
  const createNewTaskBelow = (newTaskName: string) => {
    if (index+1 >= data.project.length || data.project[index+1] != "") {
      data.project.splice(index+1, 0, "");
      saveFcn(newTaskName);
    }
  };
  const createNewProjectBelow = () => {
    const currentProjectIndex = data.listOfProjects.indexOf(task.project);
    data.day = insertKeyValuePair("", [], data.day, currentProjectIndex+1);
    save();
  };
  const newEntryFcn = (newTaskName: string) => {
    if (newTaskName) {
      createNewTaskBelow(newTaskName);
    } else {
      deleteEntry();
      createNewProjectBelow();
    }
  }
  const moveEntryFcn = (increment: number) => {
    data.project = data.project.toSpliced(index, 1).toSpliced(Math.max(0, index-increment), 0, task.task);
    save();
  }
  
  return (
    <li>
      <EditableEntry {...{entry: task.task, saveFcn, newEntryFcn, deleteEntry, moveEntryFcn}} />
    </li>
  );
}


export default TaskEntry;
