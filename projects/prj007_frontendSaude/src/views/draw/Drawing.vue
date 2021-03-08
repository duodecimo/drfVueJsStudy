<template>
  <div>
    <v-row>
      <v-col>
        <v-img
          v-if="sketch"
          :src="sketch"
          max-height="50"
          max_width="30"
          contain
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <makeSketch
          :livre="false"
          canvas_id="c1"
          canvas_trace_id="ct1"
          @setSketch="saveSketch($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <makeSketch
          :livre="true"
          canvas_id="c2"
          canvas_trace_id="ct2"
          @setSketch="saveSketch($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <makeSketch
          :livre="false"
          canvas_id="c3"
          canvas_trace_id="ct3"
          @setSketch="saveSketch($event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MakeSketch from "@/components/makeSketch";
export default {
  components: { makeSketch: MakeSketch },
  data: () => ({
    sketch: null
  }),
  methods: {
    saveSketch(data) {
      console.log("On saveSketch, data: ", data.length);
      this.sketch = data;
    }
  }
};
</script>
