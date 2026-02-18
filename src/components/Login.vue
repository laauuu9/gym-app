<template>
  <div>
    <Tabs value="0">
        <TabList>
            <Tab value="0">Iniciar sesión</Tab>
            <Tab value="1">Registrarse</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-[16px] py-5 mt-[24px]">
                    <div class="flex flex-col gap-[2px]">
                        <label for="username">Usuario</label>
                        <InputText id="username" type="text" v-model="email" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">Contraseña</label>
                        <InputText id="password" type="password" v-model="password" />
                    </div>
                    <div class="flex">
                        <Button label="Login" icon="pi pi-user" class="w-full max-w-[17.35rem] mx-auto" @click="handleLogin"></Button>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="1">
                <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-[16px] py-5 mt-[24px]">
                    <div class="flex flex-col gap-[2px]">
                        <label for="username">Usuario</label>
                        <InputText id="username" type="text" v-model="email" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">Contraseña</label>
                        <InputText id="password" type="password" v-model="password" />
                    </div>
                    <div class="flex">
                        <Button label="Registrarse" icon="pi pi-user" class="w-full max-w-[17.35rem] mx-auto" @click="handleRegister"></Button>
                    </div>
                </div>
            </TabPanel>
        </TabPanels>
    </Tabs>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login, register } from "../services/auth";

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
  } catch (e) {
    error.value = "Error al iniciar sesión";
  }
};

const handleRegister = async () => {
  try {
    await register(email.value, password.value);
  } catch (e) {
    error.value = "Error al registrarse";
  }
};
</script>
