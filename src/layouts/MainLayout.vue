<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>{{ mainHeader }}</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header>
          Доступные разделы
        </q-item-label>
        <q-item v-for="link in linksList" :key="link.caption" :to="link.route" exact clickable v-ripple @click="setMainHeader(link.caption);">
          <q-item-section avatar><q-icon :name="link.icon" /></q-item-section>
          <q-item-section>{{ link.caption }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      leftDrawerOpen: true,
      mainHeader: 'Quasar App',
    }
  },

  computed: {
    linksList() {
      const links = this.$store.getters['schedule/schedulesLinks'];
      links.push({ caption: 'О программе', icon: 'help', route: { name: 'about' } })
      return links
    }
  },

  methods: {
    toggleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen
    },

    setMainHeader(text) {
      this.mainHeader = text
    },
  },
})

/*export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    const mainHeader = ref('Quasar App')

    return {
      linksList,
      leftDrawerOpen,
      mainHeader,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})*/
</script>
