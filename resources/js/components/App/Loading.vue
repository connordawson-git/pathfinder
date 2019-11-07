<template>
    <v-row v-if="loading" align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-col>
    </v-row>
</template>

<style></style>

<script>
    export default {
        props: {
            loading: {
				type: Boolean,
				default: false
			}
        },
    }
</script>
