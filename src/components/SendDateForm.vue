<template>
  <div id="form">
    <dl>
      <dt>{{ label }}</dt>
      <dd>
        <input type="date" :value="value" @input="$emit('input',$event.target.value)" />
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "SendDateForm",
  props: {
    label: String,
    value: String
  }
};
</script>