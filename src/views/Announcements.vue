<template>
    <div v-if="loaded">
        <div class="card mb-3 text-white bg-primary">
            <div class="card-body">
                <h5 class="card-title">
                    <div v-if="term.day">Today is day {{ term.day }}.</div>
                    <div v-else>No school today!</div>
                </h5>
                <h6 class="card-subtitle mb-2 text-light">
                    <div v-if="term">{{ term.name }}</div>
                    <div v-else>There are no current terms.</div>
                </h6>
            </div>
        </div>
        <div class="card mb-3" v-for="announcement in announcements" :key="announcement.title">
            <div class="card-body">
                <h5 class="card-title">
                    <div>{{ announcement.title }}</div>
                </h5>
                <h6 class="card-subtitle mb-2 text-light">
                    <div>{{ announcement.published }}</div>
                </h6>
                <p class="card-text" v-html="announcement.summary"></p>
                <a :href="announcement.link" class="card-link" >Link to original post</a>
            </div>
        </div>
    </div>
    <div class="spinner-border" role="status" v-else>
        <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script>
export default {
    name: 'Announcements',
    data() {
        return {
            loaded: false,
            school: undefined,
            term: undefined,
            announcements: undefined,
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

                        fetch(`http://143.110.244.164`)
                            .then(response => response.json())
                            .then(data => {
                                this.announcements = data
                                this.loaded = true;
                            })
                    })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
</script>

<style>
img {
    max-width: 25%;
}
</style>
