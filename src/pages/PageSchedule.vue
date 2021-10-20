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
          <tr v-for="(e, index) in sheduleEmployees" :person="e.id" :key="`row_${e.id}`" class="q-tr--no-hover">
            <td>{{ index + 1 }}</td>
            <td>{{ e.name }}</td>
            <td v-for="d in scheduleDates" :key="`c_${e.id}_${d.day}`" @click="setPopupTarget(e.id, d.day)" :date="d.day"></td>
          </tr>
        </tbody>
      </q-markup-table>  
    </template>
    <p v-else>Отсутствуют сведения для построения графика "{{ scheduleName }}".</p>
    <q-menu ref="popup" :target="popupTarget" transition-show="flip-up">
      <q-list>
        <q-item v-for="dt in scheduleDutyTypes" :key="`dt_${dt.id}`" clickable v-close-popup>
          <q-item-section>{{ dt.name }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section>Отгул</q-item-section>
          <q-item-section>
            <q-input outlined v-model="outdoor" filled type="time" :dense="true" />
          </q-item-section>
          <q-item-section side>
            <q-icon name="send" size="xs" color="primary" />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section>Переработка</q-item-section>
          <q-item-section>
            <q-input outlined v-model="indoor" filled type="time" :dense="true" />
          </q-item-section>
          <q-item-section side>
            <q-icon name="send" size="xs" color="primary" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

const monthesRus = ['', 'январь', 'февраль',  'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const daysRus = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export default defineComponent({
  name: 'PageSchedule',

  data() {
    return {
      popupTarget: false,
      outdoor: '',
      indoor: '',
    }
  },

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

    scheduleDutyTypes() {
      return this.$store.getters['schedule/scheduleDutyTypes']
    },

    sheduleEmployees() {
      return this.$store.getters['schedule/employees']
    },
  },

  methods: {
    setPopupTarget(personId, day) {
      const newTarget = `.q-table tbody tr[person="${personId}"] td[date="${day}"]`
      if(this.popupTarget !== newTarget) {
        this.popupTarget = newTarget;
        this.$refs.popup.show();
      }
    }
  },

  mounted() {
    if(this.sheduleEmployees.length) {
      this.setPopupTarget(this.sheduleEmployees[0].id, 1)
    }
  }
})
</script>

<style scoped>
.q-menu .q-list {
  min-width: 240px;
}
</style>
