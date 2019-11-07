<template>
<div>
    <v-container class="greeting-container">
        <v-row >
            <v-col style="padding-top: 0px!important;"
            cols="12" md="12">
                <greeting/>
            </v-col>
        </v-row>
   </v-container>
   
   <home-cards/>
</div>
</template>

<script>
import Greeting from '@/components/Frontend/Greeting.vue';
import HomeCards from '@/components/Frontend/HomeCards.vue';
export default {
    components: {
        'greeting': Greeting,
        'home-cards': HomeCards
    },
}
</script>

<style scoped>
.greeting-container {
    padding: 0!important;
    margin: 0!important;
}
</style>