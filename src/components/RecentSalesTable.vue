<template>
    <div>
        <h5>Recent Sales</h5>
        <DataTable :value="customer" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 30rem">
            <Column field="address" header="Address" style="width: 25%"></Column>
            <Column field="bin_collection" header="Bin Collection" style="width: 15%"></Column>
            <Column field="subscription" header="Subscription" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import { ref, onMounted } from 'vue';
import { useDataStore } from '@/stores/DataStore';

const dataStore = useDataStore();
const customer = ref([]);  // Initialse customer as a reative reference

onMounted(async () => {
    await dataStore.fetchCustomers();
    customer.value = dataStore.getCustomer.customers  // Update customer after fetching data
});



</script> 