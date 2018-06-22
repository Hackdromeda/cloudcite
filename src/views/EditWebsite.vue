<template>
    <div id="editwebsite">
        <div class="box" id="editwebsitebox">
            <h1 id="editFormTitle" class="title is-size-4">Edit Website Citation</h1>
            <b-field grouped>
                <b-field label="First Name" expanded>
                    <b-input></b-input>
                </b-field>
                <b-field label="Last Name" expanded>
                    <b-input></b-input>
                </b-field>
            </b-field>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class EditWebsite extends Vue {}
</script>

<style scoped lang="scss">
#editFormTitle {
    color: #163b72;
}
@media (max-width: 991.97px) {
    #editwebsite {
        padding: 10px;
        margin-left: 5%;
        margin-right: 5%;
        text-align: center;
        justify-content: center;
    }
}
@media (min-width: 991.98px) {
    #editwebsite {
        padding: 10px;
        margin-left: 15%;
        margin-right: 15%;
        text-align: center;
        justify-content: center;
    }
}
</style>