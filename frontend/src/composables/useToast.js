import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

function add(message, type = 'info', duration = 3000) {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

export function useToast() {
  return {
    toasts,
    success(msg, dur) { add(msg, 'success', dur) },
    error(msg, dur) { add(msg, 'error', dur) },
    info(msg, dur) { add(msg, 'info', dur) },
    warning(msg, dur) { add(msg, 'warning', dur) },
  }
}