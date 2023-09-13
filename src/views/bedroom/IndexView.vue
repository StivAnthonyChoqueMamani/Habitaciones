<script setup>
import TargetBedroom from '../../components/TargetBedroom.vue';
import ButtonModalCreateBedroonView from './CreateView.vue';
import { useBedroomStore } from '../../stores/BedroomStore';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
const filtros = [
  'Name', 'Price'
]
const selectedFilter = ref(filtros[0])
const search = ref('')
const bedroomStore = useBedroomStore();
var resultadoFilter = bedroomStore.bedrooms;

watch(search, (newSearch) => {
  if (newSearch === '') {
    resultadoFilter = bedroomStore.bedrooms
  } else {
    if (selectedFilter.value === 'Name') {
      resultadoFilter = bedroomStore.bedrooms.filter((bedroom) => bedroom.name.includes(newSearch))
    }
    if (selectedFilter.value === 'Price') {
      resultadoFilter = bedroomStore.bedrooms.filter((bedroom) => bedroom.price == newSearch)
    }
  }
})

</script>

<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 relative flex flex-row flex-wrap justify-between">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">HABITACIONES</h1>
      <ButtonModalCreateBedroonView />
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <!-- Your content -->
      <div id="filter" class="relative flex">
        <div class="w-36">
          <Listbox v-model="selectedFilter">
            <div class="relative mt-0.5 ml-0.5">
              <ListboxButton
                class="relative w-full cursor-default rounded-l-md bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center m-2">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                <span class="block truncate mx-5">{{ selectedFilter }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <ListboxOption v-slot="{ active, selected }" v-for="filtro in filtros" :key="filtro.id" :value="filtro"
                    as="template">
                    <li :class="[
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]">
                      <span :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]">{{ filtro }}</span>
                      <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mt-0.5 ml-0.5">
          <input type="text" autocomplete="filter" v-model="search" id="filter"
            class="flex-1 border-0 rounded-r-md w-24 bg-white mb-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            placeholder="Busca..." />
        </div>
      </div>
      <hr>
      <div class="flex flex-wrap content-start">
        <TargetBedroom v-for="bedroom in resultadoFilter" :key="bedroom.name" :bedroom="bedroom" />
      </div>
    </div>
  </main>
</template>