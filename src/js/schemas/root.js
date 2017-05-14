import tasksSchema from './tasks'
import runningItemSchema from './runningItem'

export default function (data) {
  return {
    ...data,
    runningItem: runningItemSchema(data.runningItem),
    tasks: tasksSchema(data.tasks)
  }
}
