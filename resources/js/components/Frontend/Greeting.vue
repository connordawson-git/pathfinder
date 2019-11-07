<template>
    <div class="hero">
        <div class="hero-inner">
            <p>Welcome to</p>
            <h1>Pathfinder</h1>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.hero {
    /* Sizing */
    width: 100vw;
    height: 85vh;
    /* Flexbox stuff */
    display: flex;
    justify-content: center;
    align-items: center;
    /* Text styles */
    text-align: center;
    /* Background styles */
    background-image: linear-gradient(rgba(241, 232, 232, 0.699), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1557992985-4178812c1369?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
.hero-inner {
    background: #65ccb8;
    padding: 15px;
    border-radius: 15px;
    color: #fff;
}
.hero h1 {
    /* Text styles */
    font-size: 5em;
    margin-top: 0;
    margin-bottom: 0.5em;
}
.hero p {
    /* Text styles */
    font-size: 3em;
}
@media only screen and (max-width: 959px) {
    .hero {
        /* Sizing */
        height: 50vh;
    }
    .hero-inner {
        padding: 10px;
        border-radius: 15px;
    }
    .hero h1 {
        /* Text styles */
        font-size: 3em;
    }
    .hero p {
        /* Text styles */
        font-size: 2em;
    }
}
</style>