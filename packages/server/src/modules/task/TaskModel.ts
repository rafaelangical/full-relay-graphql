import mongoose, { Document, Model } from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      hidden: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'task',
  },
);

export interface ITask extends Document {
  name: string;
  description?: string;
}

// this will make find, findOne typesafe

const TaskModel: Model<ITask> = mongoose.model('Task', schema);
export default TaskModel;
