export type createScheduleType = {
  title: string;
  description: string;
  start: Date;
  end: Date;
};

export type updateScheduleType = {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
};
