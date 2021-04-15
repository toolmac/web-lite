<template>
    <div v-if="loaded">
        <div class="row" data-masonry='{"percentPosition": true }'>
            <div class="col-sm-6 col-lg-4 mb-4">
                <Event v-for="event in events" :key="event" :pk="event"></Event>
            </div>
        </div>
    </div>
    <div class="spinner-border" role="status" v-else>
        <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script>
import Event from '../components/Event.vue'

export default {
    name: 'Events',
    data() {
        return {
            loaded: false,
            school: undefined,
            term: undefined,
            events: undefined,
        }
    },
    created() {
        this.loaded
        fetch('https://timetable.paullee.dev/school/1/data')
            .then(response => response.json())
            .then(data => {
                this.school = data

                if (data.ongoing_terms.length == 0) {
                    this.loaded = true
                    return
                }

                fetch(`https://timetable.paullee.dev/term/${data.ongoing_terms[0]}/data`)
                    .then(response => response.json())
                    .then(data => {
                        this.term = data
                        this.events = data.events.reverse();

                        this.loaded = true;
                    })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    components: {
        Event
    }
}
</script>
