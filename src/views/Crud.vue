<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import ProductService from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';

import { useDataStore } from '@/stores/DataStore';

const toast = useToast();
const dataStore = useDataStore();
const customer = ref([]);  // Initialse customer as a reative reference
const  customers = ref([]);
const selectedCustomers = ref(null);
const filters = ref({});
const customerDialog = ref(false);
const deleteCustomerDialog = ref(false);
const deleteCustomersDialog = ref(false);
const submitted = ref(false);
const statuses = ref([
    { label: 'MONDAY', value: 'monday' },
    { label: 'TUESDAY', value: 'tuesday' },
    { label: 'WEDNESDAY', value: 'wednesday' },
    { label: 'THURSDAY', value: 'thursday' },
    { label: 'FRIDAY', value: 'friday' },
    { label: 'SATURDAY', value: 'saturday' },
    { label: 'SUNDAY', value: 'sunday' },
]);



onMounted(async () => {
    await dataStore.fetchCustomers();
    customer.value = dataStore.getCustomer.customers;  // Update customer constant after fetching data
});


const exportCSV = () => {
    dt.value.exportCSV();
};

const dt = ref(null);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },  // Searches Name
        address: { value: null, matchMode: FilterMatchMode.CONTAINS },
        bin_collection: { value: null, matchMode: FilterMatchMode.CONTAINS },
        subscription: { value: null, matchMode: FilterMatchMode.CONTAINS },
        active: { value: null, matchMode: FilterMatchMode.CONTAINS },
        phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}; 

onBeforeMount(() => {
    initFilters();
});

// NOTE: original cosnt is named editProduct
// Remained related functions still need to be renamed
const editCustomer = (editCustomer) => {
    customer.value = { ...editCustomer };
    customerDialog.value = true;
};

const confirmDeleteCustomer = (editCustomer) => {
    customer.value = editCustomer;
    deleteCustomerDialog.value = true;
};

const deleteCustomer = () => {
    customers.value = customers.value.filter((val) => val.id !== customer.value.id);
    deleteCustomerDialog.value = false;
    customer.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000 });
};


const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < dataStore.getCustomer.customers.value.length; i++) {
        if (dataStore.getCustomer.customers.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};
/*
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});




const productService = new ProductService();
*/
//const getBadgeSeverity = (inventoryStatus) => {
 //   switch (inventoryStatus.toLowerCase()) {
   //     case 'instock':
     //       return 'success';
       // case 'lowstock':
         //   return 'warning';
       // case 'outofstock':
         //   return 'danger';
        //default:
         //   return 'info';
   // }
//};


/*


onMounted(() => {
    productService.getProducts().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};


const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};
*/



</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="dataStore.getCustomer.customers"
                    v-model:selection="selectedCustomers"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                >
                    
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Customers</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>
                    

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="address" header="Address" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Address</span>
                            {{ slotProps.data.address }}
                        </template>
                    </Column>
                    <Column field="bin_collection" header="Bin Collection" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Bin Collection</span>
                            {{ slotProps.data.bin_collection }}
                        </template>
                    </Column>
                    <Column header="subscription" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Subscription</span>
                            {{ slotProps.data.subscription }}
                        </template>
                    </Column>
                    <Column field="order_date" header="Date" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Date</span>
                            {{ slotProps.data.order_date }}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="phone" header="Phone" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Phone</span>
                            {{ slotProps.data.phone }}
                        </template>
                    </Column>
                    <Column field="active" header="Active" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Active</span>
                            {{ slotProps.data.active }}
                        </template>
                    </Column>
                    
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editCustomer(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteProduct(slotProps.data)" />
                        </template>    
                    </Column>
            
                </DataTable>
                
                <Dialog v-model:visible="customerDialog" :style="{ width: '450px' }" header="Customer Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="customer.name" required="true" autofocus :invalid="submitted && !customer.name" />
                        <small class="p-invalid" v-if="submitted && !customer.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="address">Address</label>
                        <Textarea id="description" v-model="customer.address" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label for="bin_collection" class="mb-3">Bin Collection</label>
                        <Dropdown id="bin_collection" v-model="customer.bin_collection" :options="statuses" optionLabel="label" placeholder="Select a Status">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                    <!--
                    <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>
                    -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="phone">Phone</label>
                            <InputNumber id="phone" v-model="customer.phone" :invalid="submitted && !customer.phone" :required="true" />
                            <small class="p-invalid" v-if="submitted && !customer.phone">Phone is required.</small>
                        </div>
                        <div class="field col">
                            <label for="email">Email</label>
                            <InputNumber id="email" v-model="customer.email" integeronly />
                        </div>
                    </div>                  
                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="amount_paid">Amount Paid</label>
                            <InputNumber id="amount_paid" v-model="customer.amount_paid" mode="currency" currency="AUD" locale="en-AU" :invalid="submitted && !customer.amount_paid" :required="true" />
                            <small class="p-invalid" v-if="submitted && !customer.amount_paid">Amount paid is required.</small>
                        </div>
                        <div class="field col">
                            <label for="subscription">Subscription</label>
                            <InputNumber id="subscription" v-model="customer.subscription" integeronly />
                        </div>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteCustomerDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="customer"
                            >Are you sure you want to delete <b>{{ customer.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteCustomerDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteCustomer" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteCustomersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="customer">Are you sure you want to delete the selected customers?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteCustomersDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCustomers" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
