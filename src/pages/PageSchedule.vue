<template>
  <q-page class="q-pa-lg">
    <template v-if="scheduleDataExists">
      <div class="q-pb-sm text-h5">График на {{ scheduleHeaderDateString }} года</div>
      <q-markup-table separator="cell">
        <thead>
          <tr>
            <th>№</th>
            <th>Сотрудник</th>
            <th v-for="d in scheduleDates" :key="`th_${d.day}`">{{ d.day }}<br>{{ d.wd }}</th>
          </tr>
        </thead>
        <tbody v-if="sheduleEmployees.length">
          <tr v-for="(e, index) in sheduleEmployees" :key="`row_${e.id}`" class="q-tr--no-hover">
            <td>{{ index }}</td>
            <td>{{ e.name }}</td>
            <td v-for="d in scheduleDates" :key="`c_${e.id}_${d.day}`"></td>
          </tr>
        </tbody>
      </q-markup-table>  
    </template>
    <p v-else>Отсутствуют сведения для построения графика "{{ scheduleName }}".</p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

const monthesRus = ['', 'январь', 'февраль',  'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const daysRus = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export default defineComponent({
  name: 'PageSchedule',

  props: {
    id: { type: String, required: true },
  },

  computed: {
    scheduleDataExists() {
      return this.$store.getters['schedule/isCurrentSchedule'](this.id)
    },

    scheduleName() {
      return this.$store.getters['schedule/scheduleNameById'](this.id)
    },

    scheduleDateParams() {
      return this.$store.getters['schedule/scheduleDateParams']
    },

    scheduleHeaderDateString() {
      return monthesRus[this.scheduleDateParams.month] + ' ' + this.scheduleDateParams.year
    },

    scheduleDates() {
      let dates = []
      let weekDay = this.scheduleDateParams.firstWeekDay;
      for(let i = 1; i <= this.scheduleDateParams.lastDay; i++) {
        dates.push({ day: i, wd: daysRus[weekDay] })
        weekDay = ++weekDay > 6 ? 0 : weekDay
      }
      return dates
    },

    sheduleEmployees() {
      return this.$store.getters['schedule/employees']
    },
  }
})
</script>
