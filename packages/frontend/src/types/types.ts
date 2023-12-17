export type ScheduleType = {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
};

export type eventScheduleType = {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
};

export type createScheduleType = {
  title: string;
  description?: string;
  start: Date;
  end: Date;
};

export type updateScheduleType = {
  id: number;
  title: string;
  description?: string;
  start: Date;
  end: Date;
};
