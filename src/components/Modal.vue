<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <FontAwesomeIcon :icon="faHeaderIcon" class="me-1"/>
            {{ title }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// define props
defineProps({
  title: {
    type: String,
    default: "<<Title goes here>>",
  },
  faHeaderIcon: {
    type: Array,
    default: []
  }
});

// refs and variables
const modalEle = ref(null);
let thisModalObj = null;

// lifecycle
onMounted(() => {
  if (modalEle.value) {
    thisModalObj = new Modal(modalEle.value);
  }
});

// exposed methods
function _show() {
  thisModalObj?.show();
}
defineExpose({ show: _show });
</script>