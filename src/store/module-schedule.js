export default {
  namespaced: true,
  state: {
    schedules: [
      { id: 1,  name: 'Смена торгового зала' },
      { id: 10, name: 'Смена склада' },
      { id: 20, name: 'Смена офиса' },
    ],
    curSchedule: {
      id: 1,
      name: 'Смена торгового зала',
      year: 2021,
      month: 10,
      duty_types: [
        { id: 2, name: 'Кассир' },
        { id: 3, name: 'Продавец-консультант' },
        { id: 4, name: 'Работник зала' },
      ],
      persons: [
        {id: 1, name: 'Пирогова А.С.'},
        {id: 2, name: 'Кондратова В.К.'},
        {id: 3, name: 'Савушкина И.П.'},
      ],
    }
  },
  getters: {
    schedulesLinks(state) {
      return state.schedules.map(x => { return {
        caption: x.name,
        route: { path: '/schedule/' + x.id },
        icon: 'group'
      }})
    },

    scheduleNameById(state) {
      return schId => state.schedules.find(x => x.id == schId).name
    },
    
    isCurrentSchedule(state) {
      return schId => state.curSchedule.id == schId
    },

    scheduleDateParams(state) {
      return {
        year: state.curSchedule.year,
        month: state.curSchedule.month,
        lastDay: new Date(state.curSchedule.year, state.curSchedule.month, 0).getDate(),
        firstWeekDay: new Date(state.curSchedule.year, state.curSchedule.month - 1, 1).getDay(),
      }
    },

    scheduleDutyTypes(state) {
      return state.curSchedule.duty_types
    },

    employees(state) {
      return state.curSchedule.persons
    }
  },

  mutations: {

  },
  actions: {

  },
}
