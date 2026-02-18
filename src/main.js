import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import CascadeSelect from 'primevue/cascadeselect'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Drawer from 'primevue/drawer'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'

import './tailwind/styles.css'


const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Checkbox', Checkbox)
app.component('Button', Button)
app.component('CascadeSelect', CascadeSelect)
app.component('IconField', IconField)
app.component('InputText', InputText)
app.component('InputIcon', InputIcon)
app.component('Drawer', Drawer)
app.component('Tabs', Tabs)
app.component('TabPanel', TabPanel)
app.component('TabList', TabList)
app.component('Tab', Tab)
app.component('TabPanels', TabPanels)

app.mount('#app')