
<template>
    <div class="card p-fluid">
        <DataTable v-if="dataStore.getCustomer.customers && dataStore.getCustomer.customers.length" v-model:filters="filters" :value="dataStore.getCustomer.customers" editMode="cell" @cell-edit-complete="onCellEditComplete" filterDisplay="row"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ 'pt-0 pb-0': state['d_editing'] }]
                    })
                }
            }"
        >
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width: 25%" sortable filter>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text" @keydown.enter="filterCallback()" class="p-column-filter" />
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useDataStore } from '@/stores/DataStore';

const dataStore = useDataStore();

onMounted(async () => {
    await dataStore.fetchCustomers();
});


//const products = ref();
const columns = ref([
    {field: 'address', header: 'Address'},
    {field: 'bin_collection', header: 'Bin Collection'},
    {field: 'subscription', header: 'Subscription'},
    {field: 'order_date', header: 'Date'},
    {field: 'name', header: 'Name'},
    {field: 'phone', header: 'Phone'},
    {field: 'email', header: 'Email'},
]);
const filters = ref({
    'address': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'subscription': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'email': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
});

//onMounted(() => {
//    ProductService.getProductsMini().then((data) => (products.value = data));
//});

const onCellEditComplete = (event) => {
    let { data, newValue, field } = event;

    switch (field) {
        case 'address':
        case 'email':
            if (isPositiveInteger(newValue))
                data[field] = newValue;
            else
                event.preventDefault();
        break;

        default:
            if (newValue.trim().length > 0)
                data[field] = newValue;
            else
                event.preventDefault();
        break;
    }
};

const  isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
        return false;
    }

    str = str.replace(/^0+/, '') || '0';
    var n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
};

</script>
