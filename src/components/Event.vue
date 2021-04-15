<template>
    <div class="card mb-3">
        <div class="card-body" v-if="loaded">
            <h5 class="card-title">{{ eventData.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Starts on {{ start_date }}</h6>
            <p class="card-text">{{ eventData.description }}</p>
        </div>
        <div class="card-body" v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Event',
    props: ['pk'],
    data() {
        return {
            loaded: false,
            eventData: undefined,
            start_date: undefined,
        }
    },
    created() {
        fetch(`https://timetable.paullee.dev/event/${this.pk}/data`)
            .then(response => response.json())
            .then(data => {
                this.eventData = data
                this.start_date = new Intl.DateTimeFormat('en-US').format(new Date(data.start_date*1000));
                this.loaded = true;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
</script>
