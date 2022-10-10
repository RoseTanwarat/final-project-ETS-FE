<template>
    <div id="homeStudent">
        <!-- <button><a href="/quiz-student">{{quiz}}</a></button><br> -->
        <!-- <ul>
            <div @click="goToQuizStudentPage(quiz[0].id)">
                <li>{{quiz[0].quiz_id1}}</li>
            </div>

            <div @click="goToQuizStudentPage(quiz[1].id)">
                <li>{{quiz[1].quiz_id2}}</li>
            </div>
        </ul> -->

        <li v-for="(item,index) in quiz" :key="index" @click="goToQuizStudentPage(item.id)">{{item.quiz_id}}</li>

    </div>
</template>

<script>
export default {
    name: "HomeStudentPage",
    data() {
        return {
            quiz: [{
                quiz_id: "quiz1",
                id: "1",
            },
            {
                quiz_id: "quiz2",
                id: "2",
            },
            {
                quiz_id: "quiz3",
                id: "3",
            },
            {
                quiz_id: "quiz4",
                id: "4",
            },
            ]
            //time: Number(sessionStorage.messageTime)
        }
    },
    computed: {

    },
    methods: {
        goToQuizStudentPage(id) {
            this.$router.push({ name: 'QuizPageStudent', params: { quizId: id } })
            // this.$router.push({ name: 'QuizPageStudent', params: { quizId: id }, query: { quizId: id } })
        }
        // myTitle() {
        //     this.quiz = sessionStorage.messageTitle
        // 
    },

    // mounted() {
    //     setTimeout(this.myTitle, this.time)
    // },



}
</script>