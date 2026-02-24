<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGrade } from './composables/useGrade'

// State management
const score = ref<string>('')
const showOutput = ref<boolean>(false)
const { grade, getGradeFromScore, isLoading } = useGrade()

// Helper function - matches Angular's isNumeric
const isNumeric = (value: string): boolean => {
  return !isNaN(Number(value) - parseFloat(value))
}

// Dynamic class computation - Tailwind classes
const outputClass = computed(() => {
  const baseClasses = 'px-6 py-3 text-lg font-semibold rounded-lg'

  switch (grade.value) {
    case 'F':
      return `${baseClasses} bg-red-500 text-white`
    case 'D':
      return `${baseClasses} bg-yellow-500 text-white`
    case 'C':
      return `${baseClasses} bg-cyan-500 text-white`
    case 'B':
      return `${baseClasses} bg-gray-200 text-gray-800`
    case 'A':
      return `${baseClasses} bg-green-500 text-white`
    default:
      return 'hidden'
  }
})

// Main submission handler
const handleGetGrade = async () => {
  if (isNumeric(score.value)) {
    await getGradeFromScore(Number(score.value))
    showOutput.value = true
  } else {
    showOutput.value = false
    alert('Please enter number')
  }
}
</script>

<template>
  <div class="bg-gray-100 py-12 px-4 mb-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800">Try to add your score</h1>
      <p class="text-xl text-gray-600 mt-2">You may add your score to see what your grade will be</p>
    </div>
  </div>
  <div class="max-w-4xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <form @submit.prevent="handleGetGrade">
          <label for="score" class="block text-sm font-medium text-gray-700 mb-2">Enter your score</label>
          <div class="flex gap-3">
            <input
              v-model="score"
              name="score"
              type="text"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              id="score"
              placeholder="Score..."
            />
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Loading...' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
      <div v-if="showOutput" class="flex items-center gap-3">
        <span class="text-gray-700">Your grade is</span>
        <button type="button" :class="outputClass">
          {{ grade }}
        </button>
      </div>
    </div>
  </div>
</template>
