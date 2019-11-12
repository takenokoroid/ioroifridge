<template>
  <div id="form">
    <dl>
      <dt>{{ label }}</dt>
      <dd>
        <input type="text" :value="value" @input="$emit('input',$event.target.value)" />
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "SendTextForm",
  props: {
    label: String,
    value: String
  }
};
</script>