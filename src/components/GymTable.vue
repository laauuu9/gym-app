<template>
  <div class="buttons-container">
    <Drawer v-model:visible="visible" header="Sesiones">
      <div class="sesiones-list">
        <!-- Revisar de añadir un ScrollPanel -->
        <Button v-for="sesion in sesiones" :key="sesion.id" @click="seleccionarSesion(sesion)">
          {{ sesion.id }}
        </Button>
      </div>

      <Button @click="agregarSesion">Añadir Sesión</Button>
    </Drawer>
    <Button icon="pi pi-arrow-right" @click="visible = true" />
    <Button v-if="sesion" @click="agregarJugadora">Añadir Jugadora</Button>
    <Button icon="pi pi-sign-out" class="ml-auto" @click="handleLogout" />
  </div>

  <div v-if="!sesion" class="bc-logo w-[300px] mt-[100px]">
    <img width="148" height="180" src="https://basquetcoruna.com/wp-content/uploads/2025/04/basquet-coruna.svg" class="attachment-full size-full wp-image-47" alt="">
  </div>

  <div v-if="sesion" class="current-session">Sesión: {{ sesion }}</div>

  <div v-if="sesion" class="gym-table-container">
    <Tabs value="0">
      <TabList>
          <Tab value="0">Calentamiento</Tab>
          <Tab value="1">Bloque 1</Tab>
          <Tab value="2">Bloque 2</Tab>
          <Tab value="3">Bloque 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <!-- Tabla calentamiento -->
          <DataTable :value="jugadoras">
            <Column field="nombre" header="Jugadora">
              <template #body="slotProps">
                <span>{{ slotProps.data.nombre }}</span>
              </template>
            </Column>

            <Column v-for="i in 6" :key="i" :header="'E' + i">
              <template #body="slotProps">
                <CascadeSelect 
                  :modelValue="slotProps.data.ejercicios[i - 1]"
                  @update:modelValue="value => toggleEjercicio(slotProps.data, i - 1, value)" 
                  :options="['-', 'X', '1', '2']" 
                  :optionGroupChildren=[] 
                  placeholder="" />
              </template>
            </Column>

            <Column header="Selección total">
              <template #body="slotProps">
                <CascadeSelect
                  @update:modelValue="value => marcarBloqueCompleto(slotProps.data, 6, value)" 
                  :options="['-', 'X', '1', '2']" 
                  :optionGroupChildren=[] 
                  placeholder="" />
              </template>
            </Column>
          </DataTable>
        </TabPanel>

        <TabPanel value="1">
          <!-- Tabla Bloque 1 -->
          <DataTable :value="jugadoras">
            <Column field="nombre" header="Jugadora" />

            <Column v-for="i in 3" :key="i + 6" :header="'E' + (i + 6)">
              <template #body="slotProps">
                <CascadeSelect 
                  :modelValue="slotProps.data.ejercicios[i - 1 + 6]"
                  @update:modelValue="value => toggleEjercicio(slotProps.data, i - 1 + 6, value)" 
                  :options="['-', 'X', '1', '2']" 
                  :optionGroupChildren=[] 
                  placeholder="" />
              </template>
            </Column>
          </DataTable>
        </TabPanel>

        <TabPanel value="2">
          <!-- Tabla Bloque 2 -->
          <DataTable :value="jugadoras">
            <Column field="nombre" header="Jugadora" />

            <Column v-for="i in 3" :key="i + 9" :header="'E' + (i + 9)">
              <template #body="slotProps">
                <CascadeSelect 
                  :modelValue="slotProps.data.ejercicios[i - 1 + 9]"
                  @update:modelValue="value => toggleEjercicio(slotProps.data, i - 1 + 9, value)" 
                  :options="['-', 'X', '1', '2']" 
                  :optionGroupChildren=[] 
                  placeholder="" />
              </template>
            </Column>
          </DataTable>
        </TabPanel>

        <TabPanel value="3">
          <!-- Tabla Bloque 3 -->
          <DataTable :value="jugadoras">
            <Column field="nombre" header="Jugadora" />

            <Column v-for="i in 3" :key="i + 12" :header="'E' + (i + 12)">
              <template #body="slotProps">
                <CascadeSelect 
                  :modelValue="slotProps.data.ejercicios[i - 1 + 12]"
                  @update:modelValue="value => toggleEjercicio(slotProps.data, i - 1 + 12, value)" 
                  :options="['-', 'X', '1', '2']" 
                  :optionGroupChildren=[] 
                  placeholder="" />
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, setDoc } from 'firebase/firestore'
import 'primeicons/primeicons.css'
import { logout } from '../services/auth'

const semana = ref(1)
const jugadoras = ref([])
const visible = ref(false)
const sesiones = ref([])
const sesion = ref('')

onMounted(async () => {
  await cargarSesiones()
})

async function cargarJugadoras() {
  const refCol = collection(db, "semanas", sesion.value, "jugadoras")
  const snapshot = await getDocs(refCol)
  jugadoras.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

async function toggleEjercicio(jugadora, index, value) {
  const nuevosEjercicios = [...jugadora.ejercicios]
  nuevosEjercicios[index] = value
  jugadora.ejercicios = nuevosEjercicios

  const refDoc = doc(db, "semanas", sesion.value, "jugadoras", jugadora.id)
  await updateDoc(refDoc, {
    ejercicios: nuevosEjercicios
  })
}

async function agregarJugadora() {
  const nombre = prompt("Nombre de la jugadora")
  if (!nombre) return
  const docRef = await addDoc(collection(db, `semanas`, sesion.value, "jugadoras"), {
    nombre,
    ejercicios: Array(15).fill('-')
  })
  jugadoras.value.push({ id: docRef.id, nombre, ejercicios: Array(15).fill('-') })
}

async function seleccionarSesion(s) {
  sesion.value = s.id
  await cargarJugadoras()
  visible.value = false
}

async function cargarSesiones() {
  const refCol = collection(db, "semanas")
  const snapshot = await getDocs(refCol)
  sesiones.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

async function agregarSesion() {
  const s = prompt("Nombre de la sesión")
  if (!s) return
  await setDoc(doc(db, "semanas", s), {})
  sesiones.value.push(s)
}

async function marcarBloqueCompleto(jugadora, index, value) {
  const nuevosEjercicios = [...jugadora.ejercicios]
  for (let i = 0; i < index; i++) {
    nuevosEjercicios[i] = value
  }
  jugadora.ejercicios = nuevosEjercicios

  const refDoc = doc(db, "semanas", sesion.value, "jugadoras", jugadora.id)
  await updateDoc(refDoc, {
    ejercicios: nuevosEjercicios
  })
}

const handleLogout = async () => {
  await logout();
};
</script>

<style> 
.p-cascadeselect {
  max-width: 60px;
}
.gym-table-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.p-datatable-header{
  font-weight: bold;
  font-size: 24px;
  width: fit-content !important;
}
.p-datatable-table {
  width: fit-content !important;
}
.buttons-container {
  display: flex;
  gap: 20px;
}
.sesiones-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .p-button {
    background-color: var(--p-gray-400);
    border-color: var(--p-gray-400);
  }
  .p-button:hover {
    background-color: var(--p-gray-500) !important;
    border-color: var(--p-gray-500) !important;
  }
}
.p-drawer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.p-datatable-header-cell {
  justify-items: center;
}
.current-session {
  font-size: 26px;
  font-weight: bold;
  margin: 20px 0;
}
.bc-logo {
  justify-self: center;
}
</style>