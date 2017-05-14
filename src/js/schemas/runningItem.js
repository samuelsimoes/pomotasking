export default function (data) {
  if (data) {
    data = {
      ...data,
      startedAt: (new Date(data.startedAt))
    }
  }

  return data
}
