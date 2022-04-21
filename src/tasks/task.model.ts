interface ITask {
  id: string;
  title: string;
  description: string;
  status: ETaskStatus;
}

enum ETaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export { ITask };
