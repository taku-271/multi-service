export type ScheduleType = {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
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
