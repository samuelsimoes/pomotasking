export default function (description) {
  description = description.split('\n')[0]

  return description.length > 65 ? `${description.substring(0, 65)}…` : description
}
