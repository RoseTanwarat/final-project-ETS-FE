<template>
    <div id="homeStudent">
        <!-- {{ this.quiz.id }} -->
        <!-- <button @click="goToQuizStudentPage(id)">{{ this.quiz.id }}</button> -->

        <!-- <button @click="goToQuizStudentPage(id)">New Quiz :{{ this.id }}</button> -->
        <h1>Quizzes for you</h1><br>
        <div v-for="item in test" :key="item.id">
            <!-- quiz id:{{ item.id }} -->
            <button @click="goToQuizStudentPage(item.id)">quiz id:{{ item.id }}</button>
        </div>

        <!-- <li v-for="(item, index) in quiz" :key="index" @click="goToQuizStudentPage(item.id)">{{ item.quiz_id }} ,
            number of exams : {{ item.totalQuestion }} ,
            status : {{ item.status }}
        </li> -->

        <!-- <li v-for="(item, index) in quiz" :key="index" @click="goToQuizStudentPage(item.id)">{{ item.quiz_id }} </li> -->
    </div>
</template>

<script>
// import Question from '@/models/Question'
import Quiz from '@/models/Quiz'
//import { Question } from '@/models'
//import User from '@/models/User';
export default {
    name: "HomeStudentPage",
    data() {
        return {
            id: null,
            test: []
            // quiz: [{
            //     quiz_id: "quiz1",
            //     id: "1",
            //     totalQuestion: "4",
            //     status: "Draft"
            // },
            // {
            //     quiz_id: "quiz2",
            //     id: "2",
            //     totalQuestion: "4",
            //     status: "Draft"
            // },
            // {
            //     quiz_id: "quiz3",
            //     id: "3",
            //     totalQuestion: "4",
            //     status: "Draft"
            // },
            // {
            //     quiz_id: "quiz4",
            //     id: "4",
            //     totalQuestion: "4",
            //     status: "Draft"
            // },
            // ]''
            //quiz: "",
        }
    },
    computed: {
        getQuizs() {
            return Quiz.query().with('questions').get()
        },
        // getQuestion() {
        //     return Question.query().with('quiz_id').last()
        // }


    },
    methods: {
        goToQuizStudentPage(id) {
            this.$router.push({ name: 'QuizPageStudent', params: { quizId: id } })
        },
        checkTime() {
            // this.getQuizs.forEach(item => {
            //     // console.log(item.questions[0].post_at);
            //     // item.post_at = this.
            //     let isValid = false
            //     item.questions.forEach(data => {
            //         if (data && data.post_at) {
            //             const dateTimeInput = new Date(data.post_at)
            //             const dateTimeNow = new Date();
            //             if (dateTimeInput < dateTimeNow) {
            //                 //console.log('55555555555555');
            //                 isValid = true
            //             }
            //         }

            //     })
            //     if (isValid) {
            //         this.test.push(item)
            //     }

            // })
            // this.test.reverse()
            // console.log('102', this.test);

            this.getQuizs.forEach(item => {
                if (item && item.post_at) {
                    console.log('101', item.post_at);
                    const dateTimeInput = new Date(item.post_at)
                    const dateTimeNow = new Date();
                    if (dateTimeInput < dateTimeNow) {
                        //console.log('55555555555555');
                        console.log('106', item);
                        this.test.push(item)
                    }
                }
            })
            //console.log('111', this.test);

        }

    },
    async mounted() {
        const quizAll = await Quiz.api().getQuiz({ _limit: -1 })
        console.log(quizAll);
        this.checkTime()
        //console.log('time to post quiz', this.getQuestion.post_at);

    }

}
</script>