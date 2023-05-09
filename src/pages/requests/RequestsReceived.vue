<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <div>
      <base-card>
        <header><h2>Received Requests</h2></header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="getRequests.length > 0 && !isLoading">
          <request-item
            v-for="request in getRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          >
            <base-button> Answer Request</base-button>
          </request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </div>
  </div>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadRequests");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    getRequests() {
      return this.$store.getters["requests/getRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
