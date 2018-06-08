<template>
    <section style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
        <button class="button field is-danger" @click="checkedRows = []" :disabled="!checkedRows.length">
            <b-icon icon="close"></b-icon>
            <span>Clear checked</span>
        </button>

        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="data"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    checkable>

                    <template slot="bottom-left">
                        <b>Total checked</b>: {{ checkedRows.length }}
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Checked rows">
                <pre>{{ checkedRows }}</pre>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

    export default {
        data() {
            const data = [
                
            ]
            return {
                data,
                checkedRows: [data[1], data[3]],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'first_name',
                        label: 'First Name',
                    },
                    {
                        field: 'last_name',
                        label: 'Last Name',
                    },
                    {
                        field: 'date',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['getEditing', 'getCitation, getCitations'])
        },
        methods: {
            ...mapActions(['setCitation', 'setEditing'])
        }
    }
</script>
