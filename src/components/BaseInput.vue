<!--
https://www.vuemastery.com/courses/vue3-forms/base-input

Base components can be used across multiple eg
login form, register etc...-->

<!-- v-model directive is not used in this component,
 instead it will be added to child components
type eg. type="text" will be provided by the parent
The Goal here is to keep this component as flexible as possible
Note: default for <input> is text if not declared

: in placeholder="label" ensures that the label header and
input text in input field are reactive and coordinated
Eg. 'Email' added as the label 'email' also shows up in the input field.

:value is binded to the modelValue in Define props

**v-model:**  All components capable of being v-modeled have to emit an event
in order for the parent to be able to catch the updates to that components's data
In Vue3 by default all v-model contracts expect for your components to emit an 
'@input="$emit('update:modelValue', $event.target.value)"' event,
regardless of what type of input/inputs your component contains.
=> $event.target.value is the payload of the event 

The @input lilstener in the <input> element allows us to 
fire-off the required event every time the user types
something into the input field.

v-bind="$attrs" enables the injection of attributes directly 
on the 'input'

Label can be added to the input box using <label> {{  label  }}</label>-->


<template>
      <input
        v-bind="$attrs"
        :placeholder="label"
        class="field"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >  
</template>
<script setup>
// Label stands for any input field label
// Eg. email, password, name etc...
// This function enables the parent component to pass in the label
const props = defineProps({
  label: { 
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],  // Allows modelValue to take string or int
    default: ''
  },
})
console.log(props.label)

</script>


