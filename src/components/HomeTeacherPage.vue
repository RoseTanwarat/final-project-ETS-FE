<template>
    <div id="home">
        <button class="btn">
            <router-link to="/score" class="score">Score Student</router-link>
        </button><br>
        <div class="controls">
            <button id="add_quiz" @click="addQuiz">New Quiz</button>
        </div>
        <br>

        <div v-for="(quiz, index) in quizs" :key="index">
            <label>title : <input type="text" class="title" v-model="quiz.title"></label>
            <!-- <label>count : <input type="text" class="ans" v-model="quiz.count"></label> -->
            <label>status : <input type="text" v-model="quiz.status"></label>
            <h2 v-if="required">Title is required.</h2>
            <button @click="onClickNext()">Next</button>
        </div>
        <!-- <button @click="onClickTest(id)">{{ this.id }}</button><br> -->
        <!-- <li v-for="quizs in quizss " :key="quizs.id">{{ quizs.id }}</li> -->
        <div v-for="item in getQuizs.reverse()" :key="item.id">
            <!-- <label>{{ item.id }}</label> -->
            <button @click="goToQuizPageTeacher(item.id)">quiz id:{{ item.id }}</button>
        </div>

    </div>
</template>

<script>

import Quiz from '@/models/Quiz';
import User from '@/models/User';
export default {
    name: "HomeTeacherPage",
    data() {
        return {
            quizs: [],
            status: "",
            quiz: "",
            user_id: "",
            required: false,
            email: '',
        }
    },
    computed: {
        isRoute() {
            return this.$route
        },
        quizId() {
            return this.$route.params.quizId
        },
        roles() {
            return Quiz.query().with('id').get();
        },
        user() {
            return User.query().where('email', this.email).get();
        },
        getQuizs() {
            return Quiz.query().where('teacher_id', this.user[0]?.id).get()
        }

    },
    methods: {

        addQuiz: function () {
            return this.quizs.push({
                title: "",
                // count: "",
                status: "Draft",
            })
        },
        // async onClickTest(id) {
        //     this.$router.push({ name: 'QuizPageTeacher', params: { quizId: id } })
        // },
        async onClickNext() {
            if (this.quizs[0].title.length === 0) {
                return this.required = "false"
            } else {
                const result = await Quiz.api().titleQuiz({
                    quiz_title: this.quizs[0].title,
                    quiz_status: this.quizs[0].status,
                    teacher: this.user[0].id
                });
                console.log(result);
                console.log('id ของ quiz นี้', result.entities.Quizzes[0].id);
                this.$router.push({ path: `/quiz-teacher/${result.entities.Quizzes[0].id}` })
            }

            //console.log(this.quizs[0].title);
            //this.$router.push({ path: `/quiz-teacher/${result.entities.Quizzes[0].id}` })

            // this.$router.push({ path: `/quiz-teacher/${result.entities.Quizzes[0].id}` })
            //location.href = '/quiz-teacher';
        },
        goToQuizPageTeacher(id) {
            this.$router.push({ name: 'QuizPageTeacher', params: { quizId: id } })
        },
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },

    },
    async mounted() {
        this.email = this.getCookie("email");
        // console.log(this.email);
        //this.email = email
        await Quiz.api().getQuiz({ _limit: -1 })
        // console.log(this.getQuizs);
        // this.test = this.getQuizs
        // console.log(this.test);
    },
}
</script>