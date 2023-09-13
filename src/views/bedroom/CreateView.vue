<template>
  <div class="">
    <button type="button" @click="openModal"
      class="rounded-md bg-green-600 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex items-center">
      <PlusCircleIcon class="h-6 w-6 text-white m-1"></PlusCircleIcon>
      CREAR
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-500">
                CREA TU HABITACION
              </DialogTitle>
              <div class="mt-2">
                <div class="border-b border-gray-900/10 pb-12">
                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                      <div class="mt-2">
                        <input v-model="form.name" type="text" id="name" autocomplete="name"
                          class="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Precio</label>
                      <div class="mt-2">
                        <input v-model="form.price" type="number" id="price"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label for="presentation" class="block text-sm font-medium leading-6 text-gray-900">Presentación</label>
                      <div class="mt-2">
                        <input v-model="form.presentation" type="text" id="presentation"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div class="col-span-full">
                      <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                      <div class="mt-2">
                        <textarea v-model="form.description" rows="3" id="description"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                      <p class="mt-3 text-sm leading-6 text-gray-600">Describe la habitacion que se ofrece al cliente.</p>
                    </div>

                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="saveBedroom">
                  Crear Habitacion!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useBedroomStore } from '../../stores/BedroomStore';

const bedroomStore = useBedroomStore()
const isOpen = ref(false)
const form = reactive({
  name: '',
  presentation: '',
  description: '',
  price: null,
})

function closeModal() {
  isOpen.value = false
  
}
function openModal() {
  isOpen.value = true
}
function saveBedroom() {
  isOpen.value = false
  bedroomStore.$patch((state) => {
    state.bedrooms.push({ name: form.name, presentation: form.presentation, description: form.description, price: form.price, status: 'disponible' })
  })
  form.name = ''
  form.presentation = ''
  form.description = ''
  form.price = ''
}
</script>