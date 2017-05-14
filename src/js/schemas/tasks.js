import taskSchema from './task'

export default function (data) {
  return data.map(taskSchema)
}
