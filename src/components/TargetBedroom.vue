<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
defineProps({
  bedroom: {
    name: String,
    description: String,
    presentation: String,
    price: Number,
    status: String,
  },
})
</script>

<template>
  <button @click="openModal"
    :class="bedroom.status === 'disponible' ?
      'm-2 h-28 w-72 flex-grow xl:flex-none rounded-xl text-white shadow-xl hover:border-transparent  hover:text-white focus:outline-none focus:ring-2  focus:ring-offset-2 bg-green-500 focus:ring-green-600 hover:bg-green-600' :
      'm-2 h-28 w-72 flex-grow rounded-xl  text-white shadow-xl hover:border-transparent  hover:text-white focus:outline-none focus:ring-2  focus:ring-offset-2 bg-red-500 focus:ring-red-600 hover:bg-red-600'">
    <div class="flex flex-row justify-around">
      <div class="flex flex-col justify-center">
        <div class="flex flex-row text-4xl font-bold">Nro:{{ bedroom.name }}</div>
        <div class="font-semibold">{{ bedroom.presentation }}</div>
      </div>
      <img v-if="bedroom.status === 'ocupado'" src="https://cdn-icons-png.flaticon.com/512/4968/4968745.png"
        alt="cama ocupada"
        class="h-15 w-20 [filter:invert(100%)sepia(0%)saturate(1%)hue-rotate(296deg)brightness(102%)contrast(101%);]">
      <img v-if="bedroom.status === 'disponible'" src="https://cdn-icons-png.flaticon.com/128/5496/5496851.png"
        alt="cama Matrimonial"
        class="h-15 w-20 [filter:invert(100%)sepia(0%)saturate(1%)hue-rotate(296deg)brightness(102%)contrast(101%);]" />
    </div>

    <div class="flex flex-row justify-center text-white">
      <div>{{ bedroom.status }}</div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </button>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-x-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Habitacion N{{ bedroom.name }}
              </DialogTitle>
              <div class="mt-2 mb-2">
                <p class="text-sm text-gray-500">
                  {{ bedroom.description }}
                </p>
              </div>
              <div class="">
                Precio:
                <label for="bedroom-price"></label>
                <input id="bedroom-price" class="rounded-md text-sm w-24" type="number">
              </div>
              <div class="mt-4">
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal">
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>