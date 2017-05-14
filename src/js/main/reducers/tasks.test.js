import tasksReducer from './tasks'
import * as actions from '../constants/actionTypes'
import * as taskStatuses from '../../constants/taskStatuses'

test('adds new task', () => {
  let now = {}
  let state = [
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: []
    }
  ]
  let action = {
    type: actions.NEW_TASK,
    id: 2,
    description: 'bar',
    now: now
  }

  expect(tasksReducer(state, 1, null, action)).toEqual(
    [
      {
        id: 1,
        description: 'foo',
        addedAt: {},
        status: taskStatuses.OPEN,
        listID: 1,
        pomodoros: []
      },
      {
        id: 2,
        description: 'bar',
        addedAt: now,
        status: taskStatuses.OPEN,
        listID: 1,
        pomodoros: []
      }
    ]
  )
})

test('load the tasks', () => {
  let state = []
  let tasks = [
    {
      id: 1,
      description: 'foo'
    }
  ]
  let action = {
    type: actions.LOADED_TASKS,
    tasks
  }

  expect(tasksReducer(state, 1, null, action)).toEqual(tasks)
})

test('remove a task', () => {
  let state = [
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: []
    }
  ]
  let action = {
    type: actions.DESTROY_TASK,
    id: 1
  }

  expect(tasksReducer(state, 1, null, action)).toEqual([])
})

test('toggle a task status', () => {
  let now = {}
  let state = [
    {
      id: 1,
      description: 'foo',
      status: taskStatuses.OPEN
    }
  ]
  let action = {
    type: actions.TOGGLE_FINISH_TASK,
    id: 1,
    now: now
  }
  let expectedFirstState = [
    {
      id: 1,
      description: 'foo',
      status: taskStatuses.FINISHED,
      finishedAt: now
    }
  ]

  expect(tasksReducer(state, 1, null, action)).toEqual(expectedFirstState)

  expect(tasksReducer(expectedFirstState, 1, null, action)).toEqual([
    {
      id: 1,
      description: 'foo',
      status: taskStatuses.OPEN,
      finishedAt: null
    }
  ])
})

test('update a task', () => {
  let state = [
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: []
    }
  ]
  let action = {
    type: actions.UPDATE_TASK,
    id: 1,
    data: {
      description: 'bar'
    }
  }

  expect(tasksReducer(state, 1, null, action)).toEqual([
    {
      id: 1,
      description: 'bar',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: []
    }
  ])
})

test('finish a current pomodoro of a task', () => {
  let now = {}
  let state = [
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: [{ startedAt: {}, running: true }]
    }
  ]
  let action = {
    type: actions.FINISH_CURRENT_ITEM,
    now: now
  }

  expect(tasksReducer(state, 1, 1, action)).toEqual([
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: [{ startedAt: {}, finishedAt: now, running: false }]
    }
  ])
})

test('starts a pomodoro of a task', () => {
  let now = {}
  let state = [
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.OPEN,
      listID: 1,
      pomodoros: []
    }
  ]
  let action = {
    type: actions.START_POMODORO,
    id: 1,
    now: now
  }

  expect(tasksReducer(state, 1, 1, action)).toEqual([
    {
      id: 1,
      description: 'foo',
      addedAt: {},
      status: taskStatuses.RUNNING,
      listID: 1,
      pomodoros: [{ startedAt: now, running: true }]
    }
  ])
})

test('reorder open pomodoros order', () => {
  let task1 = {
    id: 1,
    description: 'foo',
    status: taskStatuses.FINISHED
  }
  let task2 = {
    id: 2,
    description: 'bar',
    status: taskStatuses.OPEN
  }
  let task3 = {
    id: 3,
    description: 'foofoo',
    status: taskStatuses.OPEN
  }
  let state = [task1, task2, task3]
  let action = {
    type: actions.UPDATE_OPEN_TASKS_ORDER,
    intendedOpenedOrder: [3, 2]
  }

  expect(tasksReducer(state, 1, null, action)).toEqual([task1, task3, task2])
})
