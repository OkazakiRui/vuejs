<template>
  <div>
    <h1>Hello!World!</h1>
    <div style="padding-bottom : 500px">
      <h2>イベントのフォーム</h2>

      <!-- <EventTitle v-model="eventDate.title"></EventTitle> -->
      <!-- <EventTitle
        :value="eventDate.title"
        @input="eventDate.title = $event"
      ></EventTitle> -->
      <EventTitle
        :value="eventDate.title"
        @input="eventDate.title = $event"
      ></EventTitle>

      <label for="maxNumber">最大人数</label>
      <input type="number" id="maxNumber" v-model="eventDate.number" />
      <input type="number" id="maxNumber" v-model.number="eventDate.number" />
      <p>{{ "v-model.number : " + typeof eventDate.number }}</p>

      <label for="host">主催者</label>
      <input type="text" id="host" v-model.trim="eventDate.host" />
      <pre>{{ "v-model.trim : " + eventDate.host }}</pre>

      <label for="detial">イベントの内容</label>
      <textarea
        id="detial"
        cols="30"
        rows="10"
        v-model="eventDate.detial"
      ></textarea>
      <pre>{{ "v-model : " + eventDate.detial }}</pre>

      <input type="checkbox" id="isPrivate" v-model="eventDate.isPrivate" />
      <label for="isPrivate">イベントを非公開にする</label>
      <p>{{ "v-model : " + eventDate.isPrivate }}</p>

      <p>参加条件</p>
      <input type="checkbox" id="10" value="10代" v-model="eventDate.target" />
      <label for="10">10代</label>
      <input type="checkbox" id="20" value="20代" v-model="eventDate.target" />
      <label for="20">20代</label>
      <input type="checkbox" id="30" value="30代" v-model="eventDate.target" />
      <label for="30">30代</label>
      <p>{{ "v-model : " + eventDate.target }}</p>

      <p>参加費</p>
      <input type="radio" id="free" value="無料" v-model="eventDate.price" />
      <label for="free">無料</label>
      <input type="radio" id="paid" value="有料" v-model="eventDate.price" />
      <label for="paid">有料</label>
      <p>{{ "v-model : " + eventDate.price }}</p>

      <p>開催場所</p>
      <select v-model="eventDate.location" multiple>
        <option v-for="location in locations" :key="location">{{
          location
        }}</option>
      </select>
      <p>{{ "v-model : " + eventDate.location }}</p>
    </div>
  </div>
</template>

<script>
import EventTitle from "./components/EventTitle.vue";

export default {
  data() {
    return {
      locations: ["東京", "名古屋", "大阪"],
      eventDate: {
        title: "タイトル",
        number: 0,
        host: "           岡崎 流依",
        detial: "",
        isPrivate: false,
        target: [],
        price: "無料",
        location: [],
      },
    };
  },
  components: {
    EventTitle,
  },
};
</script>
