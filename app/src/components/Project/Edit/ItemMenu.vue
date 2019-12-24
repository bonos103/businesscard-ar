<template lang="pug">
  div
    div(:class="$style.button", @click="visibleDeleteModal = true")
      trash-icon
    confirm-modal(
      v-model="visibleDeleteModal",
      @cancel="visibleDeleteModal = false",
      @ok="handleDelete",
    )
      div(slot="text") このアイテムを削除してよろしいですか？
</template>
<script>
import { mapActions } from 'vuex'
import { DELETE_ITEM } from '@/store/modules/projects/types'
import ConfirmModal from '@/components/Modal/ConfirmModal.vue'
import TrashIcon from '@/components/Icon/TrashIcon.vue'

export default {
  components: {
    ConfirmModal,
    TrashIcon,
  },
  data() {
    return {
      visibleDeleteModal: false,
    }
  },
  methods: {
    ...mapActions('projects', {
      DELETE_ITEM,
    }),
    handleDelete() {
      this.visibleDeleteModal = false
      setTimeout(this.DELETE_ITEM, 200)
    },
  },
}
</script>
<style lang="postcss" module>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: color-mod(#fff a(50%));
    }

    & svg {
      stroke: var(--black);
      stroke-width: 1px;
    }
  }
</style>
